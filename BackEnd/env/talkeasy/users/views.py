from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile, MessageContent, MessageGroup
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from django.db.models import Q


from django.contrib.auth import login


class Login(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None and check_password(password, user.password):
            login(request, user)

            user_instance = User.objects.get(username=username)
            profile_instance = user_instance.userProfile

            return Response(
                {
                    "data": {
                        "username": user_instance.username,
                        "isAdmin": profile_instance.isAdmin,
                    }
                }
            )
        else:
            raise AuthenticationFailed("Invalid username or password")


class CreateUser(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        try:
            user_instance = User.objects.create(username=username)
            user_instance.set_password(password)
            user_instance.save()
            profile_instance = UserProfile(user=user_instance, isAdmin=False)
            profile_instance.save()
            return Response({"data": {"message": "user Created Successfully"}})
        except Exception:
            raise ValidationError("Error in creating User")


class LogoutUser(APIView):
    def get(self, request):
        logout(request)
        return Response({"data": {"message": "user logged out"}})


class RetrieveUserData(APIView):
    def post(self, request):
        username = request.data.get("username")
        try:
            profile_instance = UserProfile.objects.get(user__username=username)
            result_obj = {
                "username": profile_instance.user.username,
                "isAdmin": profile_instance.isAdmin,
                "groupList": [group.name for group in MessageGroup.objects.all()],
                "peopleList": [
                    user.user.username
                    for user in UserProfile.objects.filter(isAdmin=False)
                ],
                "groupData": [],
            }

            for group in MessageGroup.objects.all():
                group_temp = {
                    "groupName": group.name,
                    "members": [
                        member.user.username
                        for member in UserProfile.objects.filter(groups=group)
                    ],
                    "messages": [],
                }

                for message in MessageContent.objects.filter(group=group):
                    message_obj = {
                        "user": message.message_by.user.username,
                        "messageContent": message.message_data,
                        "messageReaction": message.message_reaction,
                    }
                    group_temp["messages"].append(message_obj)

                result_obj["groupData"].append(group_temp)

            return Response({"data": result_obj})
        except Exception:
            raise ValidationError("Error in creating User")


class AddMessage(APIView):
    def post(self, request):
        try:
            groupName = request.data.get("groupName")
            newmsg = request.data.get("newmsg")
            currentUser = request.data.get("currentUser")
            group_instance = MessageGroup.objects.filter(name=groupName)[0]
            user_instance = UserProfile.objects.filter(user__username=currentUser)[0]
            new_msg = MessageContent.objects.create(
                message_by=user_instance,
                group=group_instance,
                message_data=newmsg,
                message_reaction=False,
            )
            new_msg.save()
            return Response({"message": "User message added"})
        except Exception:
            raise ValidationError("Error in creating User")


class ToggleLike(APIView):
    def post(self, request):
        try:
            group_name = request.data.get("groupName")
            message_content = request.data.get("messageContent")
            message_instance = MessageContent.objects.filter(
                group__name=group_name, message_data=message_content
            )[0]
            message_instance.message_reaction = not message_instance.message_reaction
            message_instance.save()
            print(message_instance.message_reaction)
            return Response({"message": "User Like Toggled"})
        except Exception:
            raise ValueError("Unable to perform action")


class CreateNewGroup(APIView):
    def post(self, request):
        try:
            groupName = request.data.get("groupName")
            selectedPeople = request.data.get("selectedPeople")
            print("\n\n", UserProfile.objects.all(), "\n\n")
            if len(MessageGroup.objects.filter(name=groupName)) > 0:
                raise ValueError({"message": "Duplicate Groups cant exist"})

            new_group_instance = MessageGroup.objects.create(name=groupName)
            new_group_instance.save()

            for person in selectedPeople:
                user_ins = UserProfile.objects.filter(user__username=person["person"])[
                    0
                ]
                if user_ins:
                    user_ins.groups.add(new_group_instance)
                    user_ins.save()
            return Response({"message": "New Group Created"})
        except:
            raise ValueError({"message": "Group Not Created"})


class RemoveUser(APIView):
    def post(self, request):
        try:
            username = request.data.get("username")
            profile_instance = UserProfile.objects.filter(user__username=username)[0]
            user_instance = profile_instance.user
            profile_instance.delete()
            user_instance.delete()
            return Response({"message": "User Removed Successfully"})
        except:
            raise ValueError({"message": "User Not Deleted"})

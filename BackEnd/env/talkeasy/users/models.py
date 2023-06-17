from django.db import models
from django.contrib.auth.models import User


class MessageGroup(models.Model):
    name = models.CharField(max_length=200)


class MessageContent(models.Model):
    message_data = models.CharField(max_length=300, null=True)
    group = models.ForeignKey(MessageGroup, on_delete=models.CASCADE)
    message_reaction = models.BooleanField()
    message_by = models.ForeignKey("users.UserProfile", on_delete=models.CASCADE)

    def __str__(self):
        return self.message_by.user.username + self.message_data


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="userProfile", null=True
    )
    isAdmin = models.BooleanField()
    groups = models.ManyToManyField(MessageGroup)

    def __str__(self):
        return self.user.username

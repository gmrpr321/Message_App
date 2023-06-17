from django.contrib import admin
from django.urls import path
from .views import (
    Login,
    CreateUser,
    LogoutUser,
    RetrieveUserData,
    AddMessage,
    ToggleLike,
    CreateNewGroup,
    RemoveUser,
)

urlpatterns = [
    path("login/", Login.as_view()),
    path("createUser/", CreateUser.as_view()),
    path("logout/", LogoutUser.as_view()),
    path("retriveUserData/", RetrieveUserData.as_view()),
    path("addMessage/", AddMessage.as_view()),
    path("toggleLike/", ToggleLike.as_view()),
    path("createNewGroup/", CreateNewGroup.as_view()),
    path("removeUser/", RemoveUser.as_view()),
]

from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response

from .models import User
from .serializers import LoginSerializer, UserSerializer


class UserAPI(viewsets.ViewSet):
    """ user endpoint
    """
    def connect(self, *args, **kwargs):
        serializer = LoginSerializer(data=self.request.data)

        if serializer.is_valid():
            login(self.request, serializer.user_cache)
            return Response(status=204)
        return Response(serializer.errors, status=400)

    def disconnect(self, *args, **kwargs):
        logout(self.request)
        return Response(status=204)

    def auth(self, *args, **kwargs):
        serializer = UserSerializer(self.request.user)
        return Response(serializer.data, status=200)

    def detail(self, *args, **kwargs):
        serializer = UserSerializer(get_object_or_404(
            User, username=kwargs.get('handle')))

        return Response(serializer.data, status=200)

    def follow(self, *args, **kwargs):
        profile = get_object_or_404(User, id=kwargs.get('id'))
        profile.follow(self.request.user)

        return Response(status=204)

    def fans(self, *args, **kwargs):
        serializer = UserSerializer(
            get_object_or_404(
                User, id=kwargs.get('id')
            ).fans.all(), many=True)

        return Response(serializer.data, status=200)


class FeedAPI(viewsets.ViewSet):
    """ user feed
    """
    def feed(self, *args, **kwargs):
        pass

class UsersAPI(viewsets.ViewSet):
    """ users endpoint
    """
    pass
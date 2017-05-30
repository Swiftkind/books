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

    def auth(self, *args, **kwargs):
        serializer = UserSerializer(self.request.user)
        return Response(serializer.data, status=200)

    def detail(self, *args, **kwargs):
        serializer = UserSerializer(get_object_or_404(
            User, username=kwargs.get('handle')))

        return Response(serializer.data, status=200)
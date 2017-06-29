from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User


class LoginSerializer(serializers.Serializer):
    """ login serializer
    """
    user_cache = None
    _e = "Email or Password is incorrect"

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not (email or password):
            raise serializers.ValidationError(self._e)

        self.user_cache = authenticate(email=email, password=password)
        if not self.user_cache or not self.user_cache.is_active:
            raise serializers.ValidationError(self._e)

        return data


class UserSerializer(serializers.ModelSerializer):
    """ user serializer
    """
    display_name = serializers.SerializerMethodField()

    def get_display_name(self, instance):
        return "{}".format(instance.get_full_name() or instance.email)

    class Meta:
        model = User
        fields = ('__all__')
        read_only_fields = ('image', 'cover')


class UserPhotoSerializer(serializers.ModelSerializer):
    """ user photo update serializer
    """
    class Meta:
        model = User
        fields = [
            'image',
            'cover'
        ]

class ResetPasswordSerializer(serializers.ModelSerializer):
    """ user reset password serializer
    """
    class Meta:
        model = User
        fields = [
            'password'
        ]
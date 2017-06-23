from rest_framework import serializers
from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    """ Chat serializer
    """

    class Meta:
        model = Chat
        fields = ('id', 'text', 'user_from', 'user_to', )

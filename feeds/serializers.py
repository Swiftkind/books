from rest_framework import serializers
from .models import Feed

from users.serializers import UserSerializer
from books.serializers import BookSerializer


class FeedSerializer(serializers.ModelSerializer):
    """ feed serializer
    """
    user = UserSerializer()
    item = serializers.SerializerMethodField()

    def get_item(self, instance):
        return {
            'book': BookSerializer,
            'user': UserSerializer,
        }[instance.item_type.model](instance.item).data

    class Meta:
        model = Feed
        fields = ('user', 'item', 'action', 'date_created')
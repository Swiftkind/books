from rest_framework import serializers
from .models import Feed, Comment

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
        fields = ('id', 'user', 'item', 'action', 'date_created')

class CommentSerializer(serializers.ModelSerializer):
    """ comment serializer
    """
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'parent', 'feed', 'comment', 'comment_date']
        read_only_fields = ['user', 'feed']

    def get_user(self, obj):
        user = UserSerializer(obj.user).data
        return user

    def create(self, validated_data):
        comment = Comment()
        comment.user = self.context['user']
        comment.feed = self.context['feed']
        comment.comment = validated_data['comment']
        comment.parent = validated_data.get('parent')
        comment.save()
        return comment


class CommentListSerializer(serializers.ModelSerializer):
    """ comments serializer
    """
    children = serializers.SerializerMethodField()
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'parent', 'feed', 'comment', 'comment_date', 'children']

    def get_children(self, instance):
        data = self.serialize_tree(Comment.objects.filter(parent=instance))
        return data

    def serialize_tree(self, queryset):
        for i in queryset:
            data = CommentSerializer(i).data
            data['children'] = self.serialize_tree(Comment.objects.filter(parent=i))
            yield data

    


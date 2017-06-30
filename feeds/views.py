from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response

from .mixins import FeedMixin
from .serializers import FeedSerializer, CommentSerializer, CommentListSerializer
from .models import Feed, Comment

class FeedsAPI(FeedMixin, viewsets.ViewSet):
    """ user feed
    """
    def feeds(self, *args, **kwargs):
        serializer = FeedSerializer(self.get_feed(self.request.user), many=True)
        return Response(serializer.data, status=200)


class CommentsAPI(viewsets.ViewSet):
    """ user feed comment
    """
    def list(self, *args, **kwargs):
        comments =  Comment.objects.filter(parent=None)
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data, status=200)
    
    def post(self, *args, **kwargs):
        feed = get_object_or_404(Feed, id=kwargs['feed_id'])
        serializer = CommentSerializer(data=self.request.data, 
            context={'user': self.request.user, 'feed': feed })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, *args, **kwargs):
        comment = Comment.objects.get(id=kwargs['comment_id'])
        serializer = CommentSerializer(comment, data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    def delete(self,  *args, **kwargs):
        comment = Comment.objects.get(id=kwargs['comment_id'])
        
        users = []
        users.append(comment.user)
        users.append(comment.feed.user)

        if self.request.user in users:
            comment.delete()
            return Response(status=204)
        return Response(status=401)





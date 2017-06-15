from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response

from .mixins import FeedMixin
from .serializers import FeedSerializer


class FeedsAPI(FeedMixin, viewsets.ViewSet):
    """ user feed
    """
    def feeds(self, *args, **kwargs):
        serializer = FeedSerializer(self.get_feed(self.request.user), many=True)
        return Response(serializer.data, status=200)
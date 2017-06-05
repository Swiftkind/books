from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Book, Category
from .serializers import BookSerializer


class BooksAPI(viewsets.ViewSet):
    """ books list
    """
    def list(self, *args, **kwargs):
        serializer = BookSerializer(
            Book.objects.filter(**self.request.query_params.dict()), many=True)

        return Response(serializer.data, status=200)

    def search(self, *args, **kwargs):
        serializer = ''
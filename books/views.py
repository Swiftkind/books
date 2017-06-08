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
            Book.objects.filter(
                **self._clean_params(**self.request.query_params)), many=True)

        return Response(serializer.data, status=200)

    def search(self, *args, **kwargs):
        serializer = ''

    def _clean_params(self, **params):
        return {k:v if len(v) > 1 else v[0] for k,v in params.items()}


class BookAPI(viewsets.ViewSet):
    """ book detail
    """
    def favorite(self, *args, **kwargs):
        book = get_object_or_404(Book, id=kwargs.get('book_id'))
        book.favorite(self.request.user)

        return Response(status=204)
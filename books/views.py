from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Book, Category
from .serializers import BookSerializer, CategorySerializer

import collections


class BooksAPI(viewsets.ViewSet):
    """ books list
    """
    def list(self, *args, **kwargs):
        serializer = BookSerializer(
            Book.objects.filter(
                **self._clean_params(**self.request.query_params)), many=True)

        return Response(serializer.data, status=200)

    def search(self, *args, **kwargs):
        search_item = self.request.query_params.get('q')
        
        book = Book.objects.filter(title=search_item)
        serializer = BookSerializer(book, many=True)

        return Response(serializer.data, status=200)

    def _clean_params(self, **params):
        return {k:v if len(v) > 1 else v[0] for k,v in params.items()}

    def related_books(self, *args, **kwargs):
        books = Book.objects.filter(author=self.request.user)

        tags = books.values_list('tags', flat=True)
        related = [item for item, count in collections.Counter(tags).items() if count > 1]
        related_books = books.filter(tags__id__in=related).distinct()
        serializer = BookSerializer(related_books, many=True)

        return Response(serializer.data, status=200)

    def create_book(self, *args, **kwargs):
        serializer = BookSerializer(data=self.request.data)
        if serializer.is_valid():
            category = Category.objects.get(id=self.request.data['category'])
            serializer.save(author=self.request.user, category=category)
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    def get_categories(self, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=200)


class BookAPI(viewsets.ViewSet):
    """ book detail
    """
    def retrieve(self, *args, **kwargs):
        book = get_object_or_404(Book, id=kwargs.get('book_id'))

        serializer = BookSerializer(book)
        return Response(serializer.data, status=200)

    def favorite(self, *args, **kwargs):
        book = get_object_or_404(Book, id=kwargs.get('book_id'))
        book.favorite(self.request.user)

        return Response(status=204)

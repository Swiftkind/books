from django.conf.urls import url
from .views import BooksAPI, BookAPI


urlpatterns = [
    url(r'^$', BooksAPI.as_view({
        'get': 'list',
    }), name="books"),

    url(r'^search/$', BooksAPI.as_view({
        'get': 'search',
    }), name="books_search"),

    url(r'^(?P<book_id>\d+)/favorite/$', BookAPI.as_view({
        'post': 'favorite',
    }), name="book_favorite"),
]
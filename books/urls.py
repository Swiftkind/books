from django.conf.urls import url
from .views import BooksAPI, BookAPI


urlpatterns = [
    url(r'^$', BooksAPI.as_view({
        'get': 'list',
        'post': 'create_book'
    }), name="books"),
    url('^categories/$', BooksAPI.as_view({
        'get': 'get_categories'}), name="book_categories"),

    url(r'^search/$', BooksAPI.as_view({
        'get': 'search',
    }), name="books_search"),

    url(r'^(?P<book_id>\d+)/$', BookAPI.as_view({
        'get': 'retrieve',
    }), name="book_retrieve"),

    url(r'^(?P<book_id>\d+)/favorite/$', BookAPI.as_view({
        'post': 'favorite',
    }), name="book_favorite"),

    url(r'^related/$', BooksAPI.as_view({
        'get': 'related_books',
    }), name="related_books"),

]
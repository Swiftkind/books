from django.conf.urls import url
from .views import BooksAPI


urlpatterns = [
    url(r'^$', BooksAPI.as_view({
        'get': 'list',
    }), name="books"),

    url(r'^search/$', BooksAPI.as_view({
        'get': 'search',
    }), name="books_search"),
]
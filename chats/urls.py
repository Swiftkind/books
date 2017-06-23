from django.conf.urls import url
from .views import ChatAPI


urlpatterns = [
    url(r'^$', ChatAPI.as_view({
        'get': 'list',
    }), name="chats"),
]

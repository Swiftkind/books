from django.conf.urls import url
from .views import ChatAPI


urlpatterns = [
    url(r'^$', ChatAPI.as_view({
        'get': 'list',
        'post': 'create',
    }), name="chats"),

    url(r'^(?P<chat_id>[0-9a-f-]+)/$', ChatAPI.as_view({
        'get': 'retrieve',
    }), name="chat_detail"),
]

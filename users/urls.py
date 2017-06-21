from django.conf.urls import url
from .views import UserAPI


urlpatterns = [
    url(r'^auth/connect/$', UserAPI.as_view({
        'post': 'connect',
    }), name="auth_connect"),

    url(r'^auth/disconnect/$', UserAPI.as_view({
        'get': 'disconnect',
    }), name="auth_disconnect"),

    url(r'^auth/user/$', UserAPI.as_view({
        'get': 'auth',
        'put' : 'update',
    }), name="auth_user"),

    url(r'^auth/user/photo$', UserAPI.as_view({
        'put' : 'photo',
    }), name="user_photo"),

    url(r'^(?P<handle>\w+)/$', UserAPI.as_view({
        'get': 'detail',
    }), name="user_detail"),

    url(r'^(?P<id>\d+)/follow/$', UserAPI.as_view({
        'post': 'follow',
    }), name="user_follow"),

    url(r'^(?P<id>\d+)/fans/$', UserAPI.as_view({
        'get': 'fans',
    }), name="user_fans"),
]
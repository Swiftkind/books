from django.conf.urls import url
from .views import UserAPI


urlpatterns = [
    url(r'^auth/connect/$', UserAPI.as_view({
        'post': 'connect',
    }), name="auth_connect"),

    url(r'^auth/user/$', UserAPI.as_view({
        'get': 'auth',
    }), name="auth_user"),

    url(r'^(?P<handle>\w+)/$', UserAPI.as_view({
        'get': 'detail',
    }), name="user_detail"),
]
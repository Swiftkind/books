from django.conf.urls import url
from .views import FeedsAPI, CommentsAPI

urlpatterns = [
    url(r'^$', FeedsAPI.as_view({
        'get': 'feeds', 
    }), name="feeds"),

    url(r'^(?P<feed_id>\d+)/comments/$', CommentsAPI.as_view({
        'post': 'post',
    }), name="comment"),

    url(r'^comments/$', CommentsAPI.as_view({
        'get': 'list', 
    }), name="comments"),

    url(r'^(?P<feed_id>\d+)/comments/(?P<comment_id>\d+)/$', CommentsAPI.as_view({
        'put': 'update',
        'delete': 'delete',
    }), name="update_comment"),

]
from django.conf.urls import url
from .views import FeedsAPI

urlpatterns = [
    url(r'^$', FeedsAPI.as_view({
        'get': 'feeds', 
    }), name="feeds"),
]
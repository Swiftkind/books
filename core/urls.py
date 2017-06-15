from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/users/', include('users.urls')),
    url(r'^api/books/', include('books.urls')),
    url(r'^api/feeds/', include('feeds.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [
    url(r'^', TemplateView.as_view(template_name="base.html"), name="base"),
]
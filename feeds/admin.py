from django.contrib import admin
from .models import Feed


class FeedAdmin(admin.ModelAdmin):
    list_display = ('user', 'item', 'action', 'date_created')

    class Meta:
        model = Feed


admin.site.register(Feed, FeedAdmin)
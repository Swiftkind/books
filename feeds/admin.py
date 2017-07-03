from django.contrib import admin
from .models import Feed, Comment


class FeedAdmin(admin.ModelAdmin):
    list_display = ('user', 'item', 'action', 'date_created')

    class Meta:
        model = Feed

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'parent', 'feed', 'comment_date')

    class Meta:
        model = Comment


admin.site.register(Feed, FeedAdmin)
admin.site.register(Comment, CommentAdmin)
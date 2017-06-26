from django.contrib import admin
from .models import Chat

# Register your models here.

class ChatAdmin(admin.ModelAdmin):
    '''
        Admin View for Chat
    '''
    list_display = ('id', 'user_from', 'user_to', 'date_created', 'text', )

admin.site.register(Chat, ChatAdmin)

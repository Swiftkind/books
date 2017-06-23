import uuid
from django.conf import settings
from django.db import models


class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=255)
    user_from = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="user_from")
    user_to = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="user_to")

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return "{} - {} to {}".format(self.id, self.user_from, self.user_to)

from django.conf import settings

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from django.db import models


class Feed(models.Model):
    """ feed.
        combination of user and followed user activities
    """
    ADD = 'add'
    UPDATE = 'update'
    FOLLOW = 'follow'
    FAVORITE = 'favorite'
    ACTION = (
        (ADD, "Add"),
        (UPDATE, "Update"),
        (FOLLOW, "Follow"),
        (FAVORITE, "Favorite"),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    item_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    item_id = models.PositiveIntegerField()
    item = GenericForeignKey('item_type', 'item_id')

    action = models.CharField(max_length=50, choices=ACTION, default=ADD)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "[{}] {}".format(self.action, self.id)
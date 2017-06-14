from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

from users.models import User
from .models import Feed


class FeedMixin(object):

    def __init__(self, *args, **kwargs):
        return super(FeedMixin, self).__init__(*args, **kwargs)

    def get_feed(self, auth_user):
        """ get all the id related to the user to get
            the feed. (books, users)
        """
        return Feed.objects.filter(
            Q(user__in=auth_user.get_following()) | \
            Q(item_id__in=auth_user.get_following().values_list('id', flat=True),
                item_type=self._get_model(User))
        )

    def _get_model(self, _model):
        return ContentType.objects.get(model=_model._meta.model_name)
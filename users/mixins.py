from books.models import Book
from books.serializers import BookSerializer

from .models import User


class FeedMixin(object):
    """ user feed.
        currently gets the Book data.
        TODO: add recent activities, follower activities
    """
    def __init__(self, *args, **kwargs):
        return super(FeedMixin, self).__init__(*args, **kwargs)
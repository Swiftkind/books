from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import JSONField


class Book(models.Model):
    """ book model
    """
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="author")
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    cover = models.ImageField(upload_to="books/", null=True, blank=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)

    category = models.ForeignKey('Category', related_name="category")
    tags = models.ManyToManyField('Category', blank=True)

    interested = models.ManyToManyField(settings.AUTH_USER_MODEL,
        related_name="interested", blank=True)
    # status(choices)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.title)

    def favorite(self, user):
        if self.interested.filter(id=user.id).exists():
            self.interested.remove(user)
            return
        
        self.interested.add(user)
        return


class Page(models.Model):
    """ Page model
    """
    book = models.ForeignKey(Book, related_name='Pages')
    order = models.PositiveIntegerField(default=0)
    content = JSONField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'page-{}'.format(self.order)


class Category(models.Model):
    """ book categories
    """
    name = models.CharField(max_length=250)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.name)


class Review(models.Model):
    """ book review
    """
    book = models.ForeignKey('Book')
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL)
    content = models.TextField(null=True, blank=True)
    rating = models.PositiveIntegerField(default=0)
    flagged = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.reviewer)
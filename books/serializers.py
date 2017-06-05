from rest_framework import serializers
from .models import Book, Review


class BookSerializer(serializers.ModelSerializer):
    """ book serializer
    """
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('__all__')


    def get_reviews(self, instance):
        return Review.objects.filter(book=instance) \
                .values_list('id', flat=True)
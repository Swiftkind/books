from rest_framework import serializers
from .models import Book, Review, Category


class CategorySerializer(serializers.ModelSerializer):
    """ book serializer
    """

    class Meta:
        model = Category
        fields = ['id','name']


class BookSerializer(serializers.ModelSerializer):
    """ book serializer
    """
    reviews = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('__all__')
        read_only_fields = ('author', 'category')


    def get_reviews(self, instance):
        return Review.objects.filter(book=instance) \
                .values_list('id', flat=True)

    def get_category(self, instance):
        return instance.category.name

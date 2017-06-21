from django.contrib import admin
from .models import Book, Category, Review


class BookAdmin(admin.ModelAdmin):
    filter_horizontal = ['tags']

    class Meta:
        model = Book

admin.site.register(Book, BookAdmin)
admin.site.register(Category)
admin.site.register(Review)
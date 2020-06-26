from django.contrib import admin
from .models import UserProfile, StockAnalysis, StockCounter, StockAnalysisImage, Comment, Bookmark


# Register your models here.

class PostImageAdmin(admin.TabularInline):
	model = StockAnalysisImage


class PostAdmin(admin.ModelAdmin):
	inlines = [PostImageAdmin, ]


admin.site.register(UserProfile)
admin.site.register(StockCounter)
# PostAdmin created allows us to upload multiple images on each stock analysis article in Django Admin page
admin.site.register(StockAnalysis, PostAdmin)
admin.site.register(Comment)
admin.site.register(Bookmark)

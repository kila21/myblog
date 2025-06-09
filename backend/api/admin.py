from django.contrib import admin

from api import models as api_models

# Register your models here.
admin.site.register(api_models.Category)
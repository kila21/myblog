from django.db import models
from django.utils.text import slugify

## category and post


class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Category'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)
    

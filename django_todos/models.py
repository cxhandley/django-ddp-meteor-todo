from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Task(models.Model):
    text = models.TextField()
    checked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.CharField(max_length=20, null=True)
    username = models.CharField(max_length=20, null=True)
    private = models.BooleanField(default=True)


    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.text

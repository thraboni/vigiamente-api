from django.db import models

class Usuario(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        app_label = 'myapp'

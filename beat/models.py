from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    date_joined = models.DateField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Beat(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    melody = models.JSONField(blank=True, default=None)
    drums = models.JSONField(blank=True, default=None)
    


class Following(models.Model):
    pass

class Likes(models.Model):
    pass


class Battles(models.Model):
    pass

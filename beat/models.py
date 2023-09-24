from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class Beat(models.Model):
    #creator
    #beat
    #timestamp
    pass


class Following(models.Model):
    pass

class Likes(models.Model):
    pass


class Battles(models.Model):
    pass

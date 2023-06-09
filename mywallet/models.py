from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class User(AbstractUser, models.Model):
    """
    Custom user model
    """

    username = None
    email = models.EmailField(("email address"), unique=True)

    profile_pic = models.ImageField(upload_to="profilepics", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Wallet(models.Model):
    """
    Wallet model for storing user's money
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.user.email

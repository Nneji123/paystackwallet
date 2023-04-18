from django.contrib import admin
from .models import User, Wallet

class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "profile_pic", "is_staff", "is_superuser",)

class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', "balance")



admin.site.register(User, UserAdmin)
admin.site.register(Wallet, WalletAdmin)

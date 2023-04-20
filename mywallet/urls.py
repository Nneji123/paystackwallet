from django.contrib.auth.views import LogoutView
from django.urls import path

from .views import CustomLoginView, RegisterView, UpdateWalletView, WalletView

urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(next_page="login"), name="logout"),
    path("", WalletView.as_view(), name="wallet"),
    path("update_wallet/", UpdateWalletView.as_view(), name="updatewallet")
]

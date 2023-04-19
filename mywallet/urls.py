from django.contrib.auth.views import LogoutView
from django.urls import path

from .views import CustomLoginView, RegisterView, WalletView, UpdateWalletView

urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(next_page="login"), name="logout"),
    path("", WalletView.as_view(), name="wallet"),
    path("update_wallet/", UpdateWalletView.as_view(), name="updatewallet"),
    # path('task-create', TaskCreate.as_view(), name='task-create'),
    # path('task-update/<int:pk>', TaskUpdate.as_view(), name='task-update'),
    # path('task-delete/<int:pk>', TaskDelete.as_view(), name='task-delete'),
    # path('task-reorder/', TaskReorder.as_view(), name='task-reorder'),
]

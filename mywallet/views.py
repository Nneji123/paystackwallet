from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.db import transaction
from django.http.response import Http404
from django.shortcuts import redirect
from django.urls import reverse_lazy
# Imports for Reordering Feature
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic.edit import (CreateView, DeleteView, FormView,
                                       UpdateView)
from django.views.generic.list import ListView
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import CustomUserCreationForm
from .models import Wallet


class CustomLoginView(LoginView):
    template_name = 'mywallet/login.html'
    fields = '__all__'
    redirect_authenticated_user = True

    def get_success_url(self) -> str:
        return reverse_lazy('wallet')


class RegisterView(FormView):
    template_name = 'mywallet/register.html'
    form_class = CustomUserCreationForm
    redirect_authenticated_user = True
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        user = form.save()
        if user is not None:
            login(self.request, user)

        return super(RegisterView, self).form_valid(form)

    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:

            return redirect('tasks')
        return super(RegisterView, self).get(*args, **kwargs)


class WalletView(LoginRequiredMixin, TemplateView):
    template_name = 'mywallet/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        try:
            wallet = Wallet.objects.get(user=user)
            wallet_balance = wallet.balance
        except Wallet.DoesNotExist:
            wallet_balance = 0.00  # Default balance if Wallet instance does not exist for the user
        context['user'] = user
        context['wallet_balance'] = wallet_balance
        return context

from django.urls import path
from .views import CustomUserCreate,RequestPasswordResetEmail,PasswordTokenCheckAPI,SetNewPasswordAPIView
from .views import Users

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('sample/', Users.as_view(), name="create_user"),
    
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]

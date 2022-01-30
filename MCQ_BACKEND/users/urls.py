from django.urls import path
from .views import CustomUserCreate,RequestPasswordResetEmail,PasswordTokenCheckAPI,SetNewPasswordAPIView,FileUplaod
from .views import MyTokenObtainPairView
from .views import Users
app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    
    path('login/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('fileupload/',FileUplaod.as_view(), name='ton_obtain_pair'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]

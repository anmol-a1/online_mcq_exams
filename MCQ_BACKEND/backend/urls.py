"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from .views import MyTokenObtainPairView,BlacklistTokenUpdateView

from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    #API Token Management
    path('api/token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #Project URLs
    path('admin/', admin.site.urls),
    path('student/', include('student.urls'),name='blog'),
    path('api/logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    # User Management
    path('auth/', include('users.urls'),name='users'),
    # Blog_API Application
    path('teacher/', include('teacher.urls'),name='teachers')
]

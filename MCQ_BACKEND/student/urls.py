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
from django.urls import path
from django.contrib import admin
from django.urls import path,include
from .views import UpcomingExamDetails,ExamQuestions,AttemptedDetails,PostResult,Checking,ExamResult
urlpatterns = [
    path('upcomingexams/<str:year>/<str:stream>',UpcomingExamDetails.as_view(),name="upcoming_exams"),
    path('examsquestions/<int:id>',ExamQuestions.as_view(),name="exam_questions"),
    path('attempteddetails/<int:id>',AttemptedDetails.as_view(),name="exam_questions"),
    path('postresult/',PostResult.as_view(),name="exam_questions"),
    path('checking/<int:userid>/<int:examid>',Checking.as_view(),name="exam_questions"),
    path('examresults/<int:examid>',ExamResult.as_view(),name="exam_questions")
]
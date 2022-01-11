from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from .views import ExamDetailView,ExamHostData,ExamHostQues,ExamGetData,StudentList,DeleteStudent,DeleteQues,ExamDetailViewPast,EditExam,ExamResult,FinalizeTotalTime,FinalizeTotalMarks
router=DefaultRouter()
router.register('examview',views.ExamGetData,basename='Exam')
urlpatterns = [
    path('examdetails/<int:id>',ExamDetailView.as_view(),name="teacherexams"),
    path('examdetailspast/<int:id>',ExamDetailViewPast.as_view(),name="teacherexams"),
    path('examhostdata/',ExamHostData.as_view(),name="teacherhostexams"),
    path('',include(router.urls)),
    path('examhostques/',ExamHostQues.as_view(),name="teacherexams"),
    path('studentlistadded/',StudentList.as_view(),name="listadded"),
    path('deletestudent/<int:pk>',DeleteStudent.as_view(),name="deletestudent"),
    path('editexam/<int:pk>',EditExam.as_view(),name="editexam"),
    path('deleteques/<int:pk>',DeleteQues.as_view(),name="deleteques"),
    path('results/<int:examid>',ExamResult.as_view(),name="ExamResult"),
    path('finalizetotaltime/<int:examid>',FinalizeTotalTime.as_view(),name="finalizetotaltime"),
    path('finalizetotalmarks/<int:examid>',FinalizeTotalMarks.as_view(),name="finalizetotalmarks")
]
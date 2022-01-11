from django.shortcuts import render
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Sum
import datetime

from .models import Exam,Questions
from student.models import Examdetails
from users.models import NewUser
from .serializers import ExamdetailsViewSerializers,ExamHostQuesSerializers,StudentListSerializers,ExamResultSerializers,FinalizeSerializers,FinalizeSerializersMarks
# Create your views here.
class FinalizeTotalTime(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=FinalizeSerializers
    def get_queryset(self,**kwargs):
        examid=self.kwargs.get('examid')
        Exams = Questions.objects.filter(id=examid)
        all_sum = Exams.aggregate(Sum('totaltime'))['totaltime__sum']
        return [{'totaltime':all_sum}]
class FinalizeTotalMarks(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=FinalizeSerializersMarks
    def get_queryset(self,**kwargs):
        examid=self.kwargs.get('examid')
        Exams = Questions.objects.filter(id=examid)
        all_sum = Exams.aggregate(Sum('marks'))['marks__sum']
        return [{'marks':all_sum}]
class ExamResult(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamResultSerializers
    def get_queryset(self,**kwargs):
        examid=self.kwargs.get('examid')
        Exams = Examdetails.objects.filter(exam_id=examid)
        return Exams
class ExamDetailView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    def get_queryset(self,**kwargs):
        id=self.kwargs.get('id')
        Exams = Exam.objects.filter(hoster=id,date__range=[datetime.datetime.now().date(),"2023-10-10"])
        return Exams
class ExamDetailViewPast(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    def get_queryset(self,**kwargs):
        id=self.kwargs.get('id')
        Exams = Exam.objects.filter(hoster=id,date__range=["2020-10-10",datetime.datetime.now().date()-datetime.timedelta(days=1)])
        return Exams
class EditExam(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    queryset = Exam.objects.all()
class StudentList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = StudentListSerializers
    def get_queryset(self):
        abcd = NewUser.objects.filter(is_staff=False)
        return abcd
class ExamHostData(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    queryset=Exam.objects.all()
class ExamGetData(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    queryset=Exam.objects.all()
class ExamHostQues(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamHostQuesSerializers
    queryset=Questions.objects.all()
class DeleteStudent(generics.DestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = StudentListSerializers
    queryset=NewUser.objects.all()
class DeleteQues(generics.DestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamHostQuesSerializers
    queryset=Questions.objects.all()
from django.shortcuts import render
from django.shortcuts import render
import datetime
from rest_framework import status,views
from rest_framework.response import Response
# ,date > datetime.datetime.now().date()
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import AllowAny
from .serializers import UpcomingExamSerializers,ExamHostQuesSerializers,AttemptedExamSerializers,PostResultSerializers,CheckingSerializers
from teacher.models import Exam,Questions
from student.models import Examdetails
from rest_framework.response import Response
class AttemptedDetails(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=AttemptedExamSerializers
    def get_queryset(self,**kwargs):
        stream = self.kwargs.get('id')
        Exams = Examdetails.objects.filter(student_id=stream)
        return Exams
class Checking(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class=CheckingSerializers
    def get(self,request,userid,examid):
        Exams = Examdetails.objects.filter(student_id=userid,exam_id=examid)
        if len(Exams)<=0:
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({'Failed': 'We have sent you a link to reset your password'}, status=status.HTTP_400_BAD_REQUEST)
        
class PostResult(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class=PostResultSerializers
    queryset=Examdetails.objects.all()
class ExamResult(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=PostResultSerializers
    def get_queryset(self,**kwargs):
        exam_id = self.kwargs.get('examid')
        Results = Examdetails.objects.filter(exam_id=exam_id)
        return Results
class UpcomingExamDetails(generics.ListAPIView):
    # print(datetime.datetime.now())
    permission_classes = [AllowAny]
    serializer_class = UpcomingExamSerializers
    def get_queryset(self,**kwargs):
        stream = self.kwargs.get('stream')
        year=self.kwargs.get('year')
        Exams = Exam.objects.filter(stream=stream,year=year,date=datetime.datetime.now().date())
        return Exams
class ExamQuestions(generics.ListAPIView):
    # print(datetime.datetime.now())
    permission_classes = [AllowAny]
    serializer_class =ExamHostQuesSerializers 
    def get_queryset(self,**kwargs):
        id = self.kwargs.get('id')
        Question = Questions.objects.filter(id=id)
        return Question
# Create your views here.
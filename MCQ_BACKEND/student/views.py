from django.shortcuts import render
import datetime
from rest_framework import status,views
from rest_framework.response import Response
# ,date > datetime.datetime.now().date()
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import AllowAny
from .serializers import UpcomingExamSerializers,ExamHostQuesSerializers,AttemptedExamSerializers,PostResultSerializers,CheckingSerializers,CheckingAttemptSerializers
from teacher.models import Exam,Questions
from student.models import ExamResult,OnExamDetail
from rest_framework.response import Response
class AttemptedDetails(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=AttemptedExamSerializers
    def get_queryset(self,**kwargs):
        stream = self.kwargs.get('id')
        Exams = ExamResult.objects.filter(student_id=stream)
        return Exams
class Checking(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class=CheckingSerializers
    def get(self,request,userid,examid):
        Exams = ExamResult.objects.filter(student_id=userid,exam_id=examid)
        if len(Exams)<=0:
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({'Failed': 'We have sent you a link to reset your password'}, status=status.HTTP_400_BAD_REQUEST)
class CheckingAttempt(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=CheckingAttemptSerializers
    def get_queryset(self,**kwargs):
        userid = self.kwargs.get('userid')
        examid = self.kwargs.get('examid')
        Exams = OnExamDetail.objects.filter(student_id=userid,exam_id=examid)
        return Exams
        
        # if len(Exams)<=0:
        #     return Response({'success': 'df'}, status=status.HTTP_200_OK)
        # else:
        #     asd=Exams[0]
        #     return Response({'Failed': asd}, status=status.HTTP_400_BAD_REQUEST)
        
class PostResult(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class=PostResultSerializers
    queryset=ExamResult.objects.all()
class ExamResults(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class=PostResultSerializers
    def get_queryset(self,**kwargs):
        exam_id = self.kwargs.get('examid')
        Results = ExamResult.objects.filter(exam_id=exam_id)
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
class InitializeExamData(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class =CheckingAttemptSerializers
class UpdateOnDetail(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class =CheckingAttemptSerializers
    queryset = OnExamDetail.objects.all()
    # print(datetime.datetime.now())
# Create your views here.
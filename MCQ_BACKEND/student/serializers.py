from rest_framework import serializers
from teacher.models import Exam,Questions
from .models import Examdetails
class ExamHostQuesSerializers(serializers.ModelSerializer):
    
    class Meta:
        model=Questions
        fields=('prim_key','id','ques','opt1','opt2','opt3','opt4','totaltime','correctoption','marks')
class UpcomingExamSerializers(serializers.ModelSerializer):
    class Meta:
        model=Exam
        fields=('subname','endtime','date','starttime','examtotaltime','id','totalmarks')
class AttemptedExamSerializers(serializers.ModelSerializer):
    class Meta:
        model=Examdetails
        fields=('id','name','date','obtained_marks','result')
class PostResultSerializers(serializers.ModelSerializer):
    class Meta:
        model=Examdetails
        fields=('id','name','date','exam_id','student_id','is_attempted','obtained_marks','result','user_name')
class CheckingSerializers(serializers.ModelSerializer):
    class Meta:
        model=Examdetails
        fields=('exam_id','student_id')

    











from rest_framework import serializers
from teacher.models import Exam,Questions
from .models import OnExamDetail,ExamResult
class ExamHostQuesSerializers(serializers.ModelSerializer):
    
    class Meta:
        model=Questions
        fields=('prim_key','id','ques','opt1','opt2','opt3','opt4','browsetime','totaltime','correctoption','marks','quesimg','opt1img','opt2img','opt3img','opt4img')
class UpcomingExamSerializers(serializers.ModelSerializer):
    class Meta:
        model=Exam
        fields=('subname','endtime','date','starttime','examtotaltime','id','totalmarks')
class AttemptedExamSerializers(serializers.ModelSerializer):
    class Meta:
        model=ExamResult
        fields=('id','subname','date','obtained_marks','roll_no')
class PostResultSerializers(serializers.ModelSerializer):
    class Meta:
        model=ExamResult
        fields=('id','subname','date','exam_id','student_id','obtained_marks','roll_no','first_name')
class CheckingSerializers(serializers.ModelSerializer):
    class Meta:
        model=ExamResult
        fields=('exam_id','student_id')
class CheckingAttemptSerializers(serializers.ModelSerializer):
    class Meta:
        model=OnExamDetail
        fields=('exam_id','student_id','markedques','minutes','id','marksupdate')

    











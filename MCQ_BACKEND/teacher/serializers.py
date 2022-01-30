from rest_framework import serializers
from .models import Exam,Questions
from student.models import ExamResult
from users.models import NewUser
class ExamHostQuesSerializers(serializers.ModelSerializer):
    class Meta:
        model=Questions
        fields=('id','ques','opt1','opt2','opt3','opt4','browsetime','totaltime','correctoption','marks','quesimg','opt1img','opt2img','opt3img','opt4img')
class ExamdetailsViewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields=('subname','hoster','stream','date','year','starttime','endtime','id','examtotaltime','totalmarks')
class StudentListSerializers(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=('year','stream','email','first_name','id')
class ExamResultSerializers(serializers.ModelSerializer):
    class Meta:
        model=ExamResult
        fields=('user_name','obtained_marks','result')
class FinalizeSerializers(serializers.ModelSerializer):
    class Meta:
        model=Questions
        fields=('totaltime',)
class FinalizeSerializersMarks(serializers.ModelSerializer):
    class Meta:
        model=Questions
        fields=('marks',)
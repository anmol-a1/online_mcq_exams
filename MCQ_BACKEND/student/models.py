from django.db import models
from teacher.models import Exam,Questions
from users.models import NewUser
from django.utils import timezone
import datetime
class OnExamDetail(models.Model):
    class Meta:
        unique_together=(('exam_id','student_id'),)
    id=models.AutoField(primary_key=True)
    exam_id=models.ForeignKey(Exam,on_delete=models.CASCADE,related_name='examdetails')
    student_id=models.ForeignKey(NewUser,on_delete=models.CASCADE,related_name='attempt')
    markedques=models.CharField(max_length=70)
    minutes=models.IntegerField()
    marksupdate=models.IntegerField(default=0)
class ExamResult(models.Model):
    class Meta:
        unique_together=(('exam_id','student_id'),)
    id=models.AutoField(primary_key=True)
    subname=models.CharField(max_length=50,default="--")
    date=models.DateField(default=datetime.date.today())
    exam_id=models.ForeignKey(Exam,on_delete=models.CASCADE,related_name='examdetailsexamid')
    student_id=models.ForeignKey(NewUser,on_delete=models.CASCADE,related_name='attemptedby')
    obtained_marks=models.IntegerField(default=00)
    roll_no=models.CharField(max_length=50,default="Na")
    first_name=models.CharField(max_length=50,default="Na")

    
    

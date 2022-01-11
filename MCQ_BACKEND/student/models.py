from django.db import models
from teacher.models import Exam,Questions
from users.models import NewUser
from django.utils import timezone
import datetime
class Examdetails(models.Model):
    class Meta:
        unique_together=(('exam_id','student_id'),)
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50,default="--")
    date=models.DateField(default=datetime.date.today())
    exam_id=models.ForeignKey(Exam,on_delete=models.CASCADE,related_name='examdetailsexamid')
    student_id=models.ForeignKey(NewUser,on_delete=models.CASCADE,related_name='attemptedby')
    is_attempted=models.BooleanField(default=False)
    obtained_marks=models.IntegerField(default=00)
    result=models.CharField(max_length=20,default="NA")
    user_name=models.CharField(max_length=20,default="Na")

    
    

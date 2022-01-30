from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import NewUser
import random
def upload_to(instance, filename):
    n1 = random.randint(1,12147483547)
    n2 = random.randint(1,12147483547)
    filename=str(n1)+str(n2)+filename
    return 'examimages/{filename}'.format(filename=filename)
class Exam(models.Model):
    id=models.AutoField(primary_key=True)
    subname=models.CharField(max_length=70,default="Maths")
    hoster=models.ForeignKey(NewUser, on_delete=models.CASCADE,related_name='user+exam+')
    year=models.CharField(max_length=50,default="FE")
    stream=models.CharField(max_length=30,default="None")
    date=models.DateField()
    starttime=models.TimeField()
    endtime=models.TimeField()
    examtotaltime=models.IntegerField(default=10)
    totalmarks=models.IntegerField(default=10)
class Questions(models.Model):
    prim_key=models.AutoField(primary_key=True)
    id=models.ForeignKey(Exam, on_delete=models.CASCADE,related_name='questionsview')
    ques=models.TextField(null=False)
    quesimg=models.ImageField(("Image"), upload_to=upload_to,blank=True)
    opt1=models.TextField(null=False)
    opt1img=models.ImageField(("Image"), upload_to=upload_to,blank=True)
    opt2=models.TextField(null=False)
    opt2img=models.ImageField(("Image"), upload_to=upload_to,blank=True)
    browsetime=models.IntegerField(default=2)
    opt3=models.TextField(null=False)
    opt3img=models.ImageField(("Image"), upload_to=upload_to,blank=True)
    opt4=models.TextField(null=False)
    opt4img=models.ImageField(("Image"), upload_to=upload_to,blank=True)
    correctoption=models.IntegerField(default=random.randint(1, 5))
    totaltime=models.IntegerField(default=1)
    marks=models.IntegerField(default=1)
    #     def get_queryset(self):
    #         return super().get_queryset() .filter(status='published')

#     # options = (
#     #     ('draft', 'Draft'),
#     #     ('published', 'Published'),
#     # )

#     category = models.ForeignKey(
#         Category, on_delete=models.PROTECT, default=1)
#     title = models.CharField(max_length=250)
#     excerpt = models.TextField(null=False)
#     content = models.TextField()
#     slug = models.SlugField(max_length=250, unique_for_date='published')
#     published = models.DateTimeField(default=timezone.now)
#     author = models.ForeignKey(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
#     status = models.CharField(
#         max_length=10, choices=options, default='published')
#     objects = models.Manager()  # default manager
#     postobjects = PostObjects()  # custom manager

#     class Meta:
#         ordering = ('-published',)

#     def __str__(self):
#         return self.title

# # Create your models here.

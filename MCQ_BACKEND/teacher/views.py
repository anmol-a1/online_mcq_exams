from django.shortcuts import render
from rest_framework import viewsets, filters, generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status,views
from rest_framework.views import APIView
from rest_framework.parsers import FormParser,MultiPartParser,JSONParser,FileUploadParser
from django.db.models import Sum
import datetime
from .models import Exam,Questions
from student.models import ExamResult
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
class ExamResults(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamResultSerializers
    def get_queryset(self,**kwargs):
        examid=self.kwargs.get('examid')
        Exams = ExamResult.objects.filter(exam_id=examid)
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
    def get_queryset(self,**kwargs):
        stream=self.kwargs.get('stream')
        print(stream)
        year=self.kwargs.get('year')
        print(year)
        Exams = abcd = NewUser.objects.filter(stream=stream,year=year)
        return Exams
    
class ExamHostData(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    queryset=Exam.objects.all()
class ExamGetData(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ExamdetailsViewSerializers
    queryset=Exam.objects.all()
class FileUplaod(views.APIView):
    parser_classes = (MultiPartParser,FormParser,JSONParser)
    # parser_classes = [FileUploadParser]
    def post(self, request, format=None):
        try:
            file_obj = request.data['questioncsv']
            print(file_obj)
            file_data=file_obj.read().decode("utf-8")
            csv_data=file_data.split("\n")
            lmn=0
            for x in csv_data:
                firls=x.split(",")
                lmn=lmn+1
                if lmn==1:
                    continue
                if(len(firls)>1):
                    Exam_id=Exam.objects.get(id=int(firls[0]))
                    print(Exam_id)
                    print(firls)
                    try:
                        created=Questions.objects.update_or_create(id=Exam_id,ques=firls[1],opt1=firls[2],opt2=firls[3],opt3=firls[4],opt4=firls[5],browsetime=int(firls[6]),totaltime=int(firls[7]),marks=int(firls[8]))
                    except:
                        print("hii")
                        pass
            return Response(status=204)
        except:
            return Response(status=400)
class CreatePost(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        print(request.data)
        serializer = ExamHostQuesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ExamHostQues(APIView):
    parser_classes = (MultiPartParser,FormParser,JSONParser)
    def post(self, request, format=None):
        data=request.data
        print(list(data.values()))
        # file_obj = request.data['quesimg']
        # file_obj1 = request.data['opt1img']
        # file_obj2 = request.data['opt2img']
        # file_obj3 = request.data['opt3img']
        # file_obj4 = request.data['opt4img']
        # print(file_obj,file_obj1,file_obj2,file_obj3,file_obj4)
        # file_data=file_obj.read().decode("utf-8")
        # csv_data=file_data.split("\n")
        # for x in csv_data:
        #     firls=x.split(",")
        #     if(len(firls)>1):
        #         print(firls)
        #         try:
        #             created=NewUser.objects.update_or_create(first_name=firls[0],user_name=firls[1],password=make_password(firls[2]),email=firls[3],stream=firls[4],year=firls[5],is_active=True)
        #         except:
        #             pass
        # data=get_data(file_obj)
        # print(json.dumps(data))
        return Response(status=204)
    # permission_classes = [AllowAny]
    # serializer_class = ExamHostQuesSerializers
    # queryset=Questions.objects.all()
class DeleteStudent(generics.DestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = StudentListSerializers
    queryset=NewUser.objects.all()
class DeleteQues(generics.DestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExamHostQuesSerializers
    queryset=Questions.objects.all()
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status,views
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer,SetNewPasswordSerializer, ResetPasswordEmailRequestSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, filters, generics, permissions
from .models import NewUser
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings 
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi
from .renderers import UserRenderer
from .serializers import UsersListSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os
app_name = 'users'
class Users(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = NewUser.objects.all()
    serializer_class = UsersListSerializer
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request,**kwargs):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if NewUser.objects.filter(email=email).exists():
            print("exist");
            uidb64=self.kwargs.get('uidb64')
            token=self.kwargs.get('token')
            user = NewUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            redirect_url = request.data.get('redirect_url', '')
            absurl = f"http://localhost:3000/forgpass/{uidb64}/{token}"
            email_body = 'Hello User, \n Use the below link to reset your password  \n' + \
                absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
            return Response({'Success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({'Failed': 'We have sent you a link to reset your password'}, status=status.HTTP_400_BAD_REQUEST)
           


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = NewUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error':'Token is not Valid'},status=status.HTTP_401_UNAUTHORIZED);
            return Response({'success':True,'message':'Crefentilas valid','uidb64':uidb64,'token':token},status=status.HTTP_200_OK)              

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)



class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)
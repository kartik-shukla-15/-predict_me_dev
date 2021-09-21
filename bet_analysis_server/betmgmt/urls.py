from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    # path(r'login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path(r'signup', views.create_user_profile, name='create_user_profile'),
    # path(r'verify-account', views.verify_account, name='verify_account'),
    # path(r'forgot-password', views.forgot_password, name='forgot_password'),
    path(r'file-upload', views.file_upload, name='file_upload'),
]
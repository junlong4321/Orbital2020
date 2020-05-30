"""djangomain URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_swagger.views import get_swagger_view

# Create swagger UI view
schema_view = get_swagger_view(title='Django Backend APIs')

urlpatterns = [
	# 127.0.0.1:8000/admin/
	path('admin/', admin.site.urls),
	# 127.0.0.1:8000/ , currently linked to ReactJS's index.html
	# path('', TemplateView.as_view(template_name='index.html')),
	# Route all api/ endpoints to djangomain/api/urls.py
	path('api/', include('api.urls')),
	# 127.0.0.1:8000/auth/ (Note that you can only do a POST request here to check on a user's token. You cannot do a GET. Also remember the last / in the url)
	path('auth/', obtain_auth_token),
	# View all of our backend APIs on Swagger
	path('', schema_view),
]

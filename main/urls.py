from django.urls import path,include
from . import views

app_name = 'main'

urlpatterns = [
    path('',views.index, name='index'), 
    path('read/',views.read, name='read'), 
    path('reading/',views.reading, name='reading'),
    path('writing/',views.writeDiary, name='writeDiary'), 
    path('delete/',views.deleteDiary, name='deleteDiary'), 
]
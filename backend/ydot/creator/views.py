from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CreatorSerializer
from .models import Creator

# Create your views here.
class CreatorViewSet(viewsets.ModelViewSet):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer
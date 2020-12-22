from django.shortcuts import render
from rest_framework import viewsets
from .serializer import DataSerializer
from .models import ChannelTotalData

# Create your views here.
class DataViewSet(viewsets.ModelViewSet):
    queryset = ChannelTotalData.objects.all()
    serializer_class = DataSerializer
from django.shortcuts import render
from rest_framework import viewsets
from .serializer import DataSerializer, BetaSerializer
from .models import ChannelTotalData, BetaData

# Create your views here.
class DataViewSet(viewsets.ModelViewSet):
    queryset = ChannelTotalData.objects.all()
    serializer_class = DataSerializer

class BetaViewSet(viewsets.ModelViewSet):
    queryset = BetaData.objects.all()
    serializer_class = BetaSerializer
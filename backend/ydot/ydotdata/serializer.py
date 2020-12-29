from rest_framework import serializers
from .models import ChannelTotalData, BetaData

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelTotalData
        fields = (
            'id',
            'channelowner',
            'createdDate',
            'attrs',
        )

class BetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = BetaData
        fields = (
            'channelId',
            'channelTitle',
            'logData',
        )
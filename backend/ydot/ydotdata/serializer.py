from rest_framework import serializers
from .models import ChannelTotalData

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelTotalData
        fields = (
            'id',
            'channelowner',
            'createdDate',
            'attrs',
        )
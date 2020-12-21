from rest_framework import serializers
from .models import Creator

class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = (
            'id', 
            'createdDate', 
            'channelId', 
            'channelTitle',
            'channelKind',
            'channelRegion',
            'channelLogoD',
            'channelLogoM',
            'channelLogoH',
            'channelDescription',
            'channelSubscriberCount',
            'channelViewCount',
            'channelVideoCount',
            'channelPublishedAt',
        )
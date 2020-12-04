from django.db import models
from creator.models import Creator
from django.conf import settings
from pytz import timezone

# Create your models here.

class ChannelTotalData(models.Model):
    #id는 자동증가를 하는 Primary key field임
    id = models.AutoField(primary_key=True)
    #채널 주인이 사라지면 자동으로 사라짐
    channelowner = models.ForeignKey(Creator, on_delete=models.CASCADE)
    #크리에이터 데이터 생성날
    createdDate = models.DateField(auto_now=True)
    #크리에이터 채널의 고유 아이디-youtube에서 제공함
    channelId = models.CharField(max_length=30)
    #크리에이터 채널 제목
    channelTitle = models.CharField(max_length=100)
    #크리에이터 구독자 수
    channelSubscriberCount = models.BigIntegerField()
    #크리에이터 조회 수
    channelViewCount = models.BigIntegerField()
    #크리에이터 영상 수
    channelVideoCount = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.createdDate + self.channelId

    @property
    def created_at_korean_time(self):
        korean_timezone = timezone(settings.TIME_ZONE)
        return self.createdDate.astimezone(korean_timezone)
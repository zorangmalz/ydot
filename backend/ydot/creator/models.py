from django.db import models
from django.conf import settings
from pytz import timezone

# Create your models here.

class Creator(models.Model):
    #id는 자동증가를 하는 Primary key field임
    id = models.AutoField(primary_key=True)
    #크리에이터 생성날
    createdDate = models.DateTimeField(auto_now_add=True)
    #크리에이터 채널의 고유 아이디-youtube에서 제공함
    channelId = models.CharField(max_length=30)
    #크리에이터 채널 제목
    channelTitle = models.CharField(max_length=100)
    #크리에이터 채널 유형
    channelKind = models.TextField()
    #크리에이터 채널 소속 국가
    channelRegion = models.CharField(max_length=10)
    #크리에이터 채널 로고 Default/Medium/High
    channelLogoD = models.URLField(max_length=200)
    channelLogoM = models.URLField(max_length=200)
    channelLogoH = models.URLField(max_length=200)
    #크리에이터 채널 설명
    channelDescription = models.TextField(blank=True, null=True)
    #크리에이터 구독자 수
    channelSubscriberCount = models.BigIntegerField()
    #크리에이터 조회 수
    channelViewCount = models.BigIntegerField()
    #크리에이터 영상 수
    channelVideoCount = models.IntegerField(blank=True, null=True)
    #크리에이터 채널 개설일
    channelPublishedAt = models.CharField(max_length=30)
    
    @property
    def created_at_korean_time(self):
        korean_timezone = timezone(settings.TIME_ZONE)
        return self.createdDate.astimezone(korean_timezone)

    def __str__(self):
        return "{0} {1}".format(self.channelId, self.channelTitle)
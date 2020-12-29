# Django 환경 불러오기
from django.conf import settings
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ydot.settings")
# settings.configure()
import django
django.setup()

# 사용자 조회할때 사용
from django.db.models import Q

# 시간 설정
import datetime

# 크리에이터 정보 및 로그 모델 가져오기
from creator.models import Creator
from ydotdata.models import ChannelTotalData

# 크리에이터 Statistics 함수 가져오기
from GetCreatorInfo import findStatistics

# 데이터 갱신 날
getDate = datetime.datetime.now().strftime('%Y-%m-%d')

def first_CreatorTotal(name):
    getCreator = Creator.objects.only('id').get(channelTitle=name)
    getId = getCreator.channelId
    statistics = findStatistics(getId)
    date = "{0}".format(getDate)
    ChannelTotalData.objects.create(channelowner=getCreator, createdDate = getDate, attrs={
        date: {
            'channelSubscriberCount': statistics['subscriberCount'],
            'channelViewCount': statistics['viewCount'],
            'channelVideoCount': statistics['videoCount']
        },
    })

if __name__ == '__main__':
    first_CreatorTotal("보물섬")
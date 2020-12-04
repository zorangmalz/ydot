#Django 환경 불러오기
from django.conf import settings
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ydot.settings")
# settings.configure()
import django
django.setup()

#GoogleAPI 사용 환경
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
import requests, json
import pandas as pd

#시간 설정
import datetime

#크리에이터 모델 설정
from creator.models import Creator

# 개발자 키
DEVELOPER_KEY = "AIzaSyAIZRX8XsSXNOpp0gtO-SGJSbxXKbfIiTw"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
channelUrl = "https://www.googleapis.com/youtube/v3/channels"

# 데이터 갱신 날
getDate = datetime.datetime.now().strftime('%Y-%m-%d')

# 고유의 ChannelId 찾기
def searchChannelId(name):
    sub = youtube.search().list(
        q = name,
        part = "snippet",
        maxResults = 10,
        regionCode = "KR",
        type="channel"
    ).execute()
    
    dic = sub['items']
    ChannelId = dic[0]['snippet']['channelId']
    return ChannelId

# ChannelId를 활용해 Channel Snippet 사용
def findSnippet(url, channelid):
    params={'part': 'snippet', 'id' : channelid, 'key' : DEVELOPER_KEY}
    res = requests.get(url, params=params)
    snippet = res.json()
    return snippet['items'][0]['snippet']

# ChannelId를 활용해 Channel Statistics 사용
def findStatistics(url, channelid):
    params={'part': 'statistics', 'id' : channelid, 'key' : DEVELOPER_KEY}
    res = requests.get(url, params=params)
    statistics = res.json()
    return statistics['items'][0]['statistics']

# ChannelId를 활용해 Channel topicDetails 사용
def findtopicDetails(url, channelid):
    params={'part': 'topicDetails', 'id' : channelid, 'key' : DEVELOPER_KEY}
    res = requests.get(url, params=params)
    topicDetails = res.json()
    if ('topicDetails' in topicDetails['items'][0]): 
        if ('topicCategories' in topicDetails['items'][0]['topicDetails']):
            return topicDetails['items'][0]['topicDetails']['topicCategories']
        else: return "미분류"
    else: return "미분류"

def firstChannel(url, name):
    originId = searchChannelId(name)
    snippet = findSnippet(channelUrl, originId)
    statistics = findStatistics(channelUrl, originId)
    topicDetails = findtopicDetails(channelUrl, originId)
    if (statistics['hiddenSubscriberCount'] == True):
        return pd.Series([])
    YoutuberInfo = {
        'GetTime' : getDate,
        'ChannelId' : originId, 
        'ChannelTitle' : name, 
        'ChannelKind' : topicDetails,
        'ChannelRegion' : "KR",
        'ChannelLogoD' : snippet['thumbnails']['default']['url'], 
        'ChannelLogoM' : snippet['thumbnails']['medium']['url'], 
        'ChannelLogoH' : snippet['thumbnails']['high']['url'], 
        'ChannelDescription' : snippet['description'],
        'ChannelSubscriberCount' : statistics['subscriberCount'],
        'ChannelViewCount' : statistics['viewCount'],
        'ChannelVideoCount' : statistics['videoCount'],
        'ChannelPublishedAt' : snippet['publishedAt']
    }

    return YoutuberInfo

def create_Creator(url, name):
    channel = list(firstChannel(url, name).values())
    # if (channel.empty == True)
    Creator(
        createdDate=channel[0],
        channelId=channel[1],
        channelTitle=channel[2],
        channelKind=channel[3],
        channelRegion=channel[4],
        channelLogoD=channel[5],
        channelLogoM=channel[6],
        channelLogoH=channel[7],
        channelDescription=channel[8],
        channelSubscriberCount=channel[9],
        channelViewCount=channel[10],
        channelVideoCount=channel[11],
        channelPublishedAt=channel[12],
    ).save()

if __name__ == '__main__':
    create_Creator(channelUrl, "보물섬")

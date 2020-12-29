import csv
import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ydot.settings")
django.setup()

from ydotdata.models import BetaData


creator = ['eo', 'gwang', 'heebab', 'hotdog', 'itsub', 'iuofficial', 'milanonna', 'mouse', 'nongjalal',
           'onescience', 'paka', 'real', 'sdad', 'sinsaimdang', 'suka', 'sunbaaking', 'thechtvn', 'woowakgood']

for i in creator:
    CSV_PATH = "/Users/kimjinsung/Desktop/youtube/data/{0}.csv".format(i)
    with open(CSV_PATH, newline='') as csvfile:
        data_reader = csv.DictReader(csvfile)
        data = {}
        for row in data_reader:
            a = row['date'].strip()
            data.update({row['date']: {"subs": row['subs'], "views": row['views']},})
        jsondata = json.dumps(data)
    BetaData.objects.create(
        channelTitle=i,
        logData=jsondata
    )

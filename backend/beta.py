import csv
import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ydot.settings")
django.setup()

from ydotdata.models import BetaData


creator = ['cooking', 'eo', 'gsh', 'gwang', 'hatsal', 'hotdog', 'itsub', 'iu', 'meungdi', 'nong',
            'piano', 'pood', 'science', 'sin', 'sjwoo', 'suka', 'woo']

for i in creator:
    CSV_PATH = "/Users/kimjinsung/Desktop/realdata/{0}.csv".format(i)
    with open(CSV_PATH, newline='') as csvfile:
        data_reader = csv.DictReader(csvfile)
        data = {}
        for row in data_reader:
            data.update({row['date']: {"subs": int(row['subs']), "views": int(row['views'])}})

        jsondata = json.dumps(data)
        final = json.loads(jsondata)
    BetaData.objects.create(
        channelTitle=i,
        logData=final
    )

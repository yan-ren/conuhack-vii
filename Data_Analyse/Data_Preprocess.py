import nltk
import numpy as np
import pymongo
import datetime
from collections import Counter


class Information:
    def __init__(self, period):
        # get information from mongodb
        self.__myclient = pymongo.MongoClient("mongodb+srv://SOEN6841:83DtR07I4jVzYqc1@moodspace.lctnaea.mongodb.net")
        self.__mydb = self.__myclient['conuhack-vii']
        self.__mycollection = self.__mydb['postmessages']
        self.__current = datetime.datetime.now()
        self.__timelimit = period
        self.__collection = []
        self.__review = []
        self.__contents = []
        self.__top_5_key_words = {}
        self.__destination = self.__mydb["analyse"]

    def __get_review_points_list(self):
        if self.__collection:
            for x in self.__collection:
                self.__review.append(x['points'])

    def __filter(self):
        posts = self.__mycollection.find()
        for x in posts:
            difference = x['createdAt'] - self.__current
            if difference.total_seconds() <= self.__timelimit:
                self.__collection.append(x)

    def __hot_key_word(self):
        if self.__collection:
            output = []
            nltk.download('averaged_perceptron_tagger')
            for x in self.__collection:
                self.__contents.append(x['message'])
            for msg in self.__contents:
                tags = nltk.pos_tag(msg.split(' '))
                adjectives = list(set(w for w, t in tags if t == 'JJ'))
                output.append(adjectives)
            counts = Counter([elem for sublist in output for elem in sublist])
            self.__top_5_key_words = dict(counts.most_common(5))

    def __get_data(self):
        # Use a breakpoint in the code line below to debug your script.
        mean = np.mean(self.__review)
        median = np.median(self.__review)
        mode = np.mode(self.__review)
        return mean, median, mode

    def __get_portion(self):
        counter = dict((str(x), self.__review.count(x)) for x in set(self.__review))
        return counter

    def update_db(self):
        self.__filter()
        self.__get_review_points_list()
        mean, median, mode = self.__get_data()
        counter = self.__get_portion()
        self.__hot_key_word()
        output = {"mean": mean,
                  "mode": mode,
                  "media": median,
                  "counter": counter,
                  "top5": self.__top_5_key_words,
                  "timeStamp": self.__current
                  }
        self.__destination.insert_one(output)

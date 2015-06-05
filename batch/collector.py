#!/usr/bin/env python
# -*- coding: utf-8 -*-

import feedparser
import urllib2


class RSS:
    def __init__(self,
                 feed_rss,
                 url,
                 title,
                 published_date=None,
                 tags=[],
                 summary=None):
        self.feed_rss = feed_rss
        self.url = url
        self.title = title
        self.published_date = published_date
        self.tags = tags
        self.summary = summary


class RSSFeed:

    def __init__(self, rss_url=None, data_store='mysql'):
        self.rss_url = rss_url
        self.data_store = data_store
        self.rss_list = []

    def feed_and_store(self):
        self.feed()
        self.store()

    def feed(self):
        fp = feedparser.parse(self.rss_url)

        # feed itmes
        # - feed rss
        # - published_parsed
        # - title
        # - tags
        # - summary
        # - url
        # - html

        for entry in fp.entries:

            published_date = entry.published_parsed
            title = entry.title
            tags = []
            for tag in entry.tags:
                tags.append(tag.term)

            summary = entry.summary
            url = entry.link

            try:
                st = uellib2.urlopen(url)
                html = st.read()
            except urllib2.HTTPError:
                # TODO: Ignore ads feed
                pass

            rss = RSS(self.rss_url,
                      url,
                      title,
                      published_date=published_date,
                      tags=tags,
                      summary=summary)

            self.rss_list.append(rss)

    def store(self):
        if self.data_store == 'mysql':
            self.store_to_mysql()
        elif self.data_store:
            self.store_to_file()
        else:
            print '[ERROR] Invalid data store'


    def store_to_mysql(self):
        pass

    def store_to_file(self):
        pass

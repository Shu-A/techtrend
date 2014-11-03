#!/bin/env python
# -*- coding: utf-8 -*-

import feedparser
import urllib2

from BeautifulSoup import BeautifulSoup
from doc import Doc

class CollectorRSS:

    def __init__(self, feed_url):
        self.feed_url = feed_url

    def collect(self):
        fp = feedparser.parse(self.feed_url)

        data_src = fp['feed']['title']

        self.docs = []
        for entry in fp['entries']:

            try:
                html = urllib2.urlopen(entry['link'])
                soup = BeautifulSoup(html)
                for script_tag in soup.body.findAll('script'):
                    script_tag.extract()
                content = soup.body.getText()
                html.close()

                doc = Doc(entry['title'], content, data_src)

                self.docs.append(doc)
            except urllib2.HTTPError:
                # TODO: Ignore ads feed
                pass

        return self.docs


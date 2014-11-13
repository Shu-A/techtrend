#!/usr/bin python
# -*- coding: utf-8 -*-

import sys

from collector import CollectorRSS
from model import WordCounter

def main():
    if len(sys.argv) < 3:
        print 'Usage:  %s <file path of rss feed url list> <limit number>' % sys.argv[0]
        exit(1)

    f = open(sys.argv[1])
    feed_urls = [ line[:-1] for line in f.readlines() ]
    f.close()

    print '--- URL list ---'
    for feed_url in feed_urls:
        print feed_url
    print '---'


    docs = []
    for feed_url in feed_urls:
        cr = CollectorRSS(feed_url)
        cr.collect()
        docs += cr.docs

    print 'Number of documents : %d' % len(docs)

    wc = WordCounter(docs)
    wc.count()
    if wc.freq_dist:
        for k ,v in sorted(wc.freq_dist.items(), key=lambda x:x[1], reverse=True)[:int(sys.argv[2])]:
            print k, v

if __name__ == '__main__':
    main()


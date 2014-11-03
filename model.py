#!/bin/env python
# -*- coding: utf-8 -*-

import MeCab
import nltk

class WordCounter:

    def __init__(self, docs):
        self.docs = docs

    def count(self, noun_only=True):
        tagger = MeCab.Tagger('-Owakati')

        #texts = [ tagger.parse(doc.content.encode('utf-8')).split() for doc in docs ]
        texts = []
        for doc in self.docs:
            node = tagger.parseToNode(doc.content.encode('utf-8'))
            tokens = []
            while node:
                if node.feature.split(',')[0] == u'名詞'.encode('utf-8'):
                    tokens.append(node.surface)
                node = node.next

            texts.append(tokens)

        tc = nltk.TextCollection(texts)

        self.freq_dist = tc.vocab()


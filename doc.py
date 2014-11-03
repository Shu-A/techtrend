#!/bin/env python
# -*- coding: utf-8 -*-

class Doc:

    date = None

    def __init__(self, title, content, data_src):
        self.title = title
        self.content = content
        self.data_src = data_src


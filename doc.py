#!/bin/env python
# -*- coding: utf-8 -*-

class Doc:

    title = None
    content = None
    data_src = None
    date = None

    def __init__(self, title, content, data_src):
        self.title = title
        self.content = content
        self.data_src = data_src


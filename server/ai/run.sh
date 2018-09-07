#!/bin/sh
# cd src && \
# 	gunicorn --bind 0.0.0.0:8002 server:app -w 8

export LC_ALL=C.UTF-8 && \
export LANG=C.UTF-8 && \
export FLASK_APP=server.py && \
export FLASK_DEBUG=0 && \
cd src && \
flask run --host='0.0.0.0' --port 8002

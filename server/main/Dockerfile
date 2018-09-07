FROM golang:latest

RUN go get -u -v github.com/schollz/find3/...
RUN go get github.com/lib/pq

RUN rm -rf /go/src/github.com/schollz/find3/server/main/*

WORKDIR /go/src/github.com/schollz/find3/server/main

COPY ./run.sh run.sh
RUN chmod +x run.sh

CMD ["/go/src/github.com/schollz/find3/server/main/run.sh"]

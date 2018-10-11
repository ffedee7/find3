FROM golang:latest

RUN go get -u -v github.com/schollz/find3/...; exit 0
RUN go get github.com/lib/pq
RUN go get -u github.com/aws/aws-sdk-go

RUN rm -rf /go/src/github.com/schollz/find3/server/main/*

WORKDIR /go/src/github.com/schollz/find3/server/main

COPY ./run.sh run.sh
RUN chmod +x run.sh

CMD ["/go/src/github.com/schollz/find3/server/main/run.sh"]

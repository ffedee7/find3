#!/bin/sh
rm main
go build -v
./main -port 8005 -debug

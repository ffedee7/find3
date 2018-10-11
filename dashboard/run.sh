#!/bin/sh
yarn build
npm install -g serve --silent
serve -s build

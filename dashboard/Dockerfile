FROM node:8.5.0-alpine as release
COPY /build ./build
RUN npm install -g serve --silent
EXPOSE 5000
CMD [ "serve", "-s", "build" ]
FROM node:latest

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY ./run.sh run.sh
RUN chmod +x run.sh

CMD ["/app/run.sh"]

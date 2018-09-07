FROM python:3.6

RUN mkdir /app

WORKDIR /app
ADD ./requirements.txt /app
RUN pip install -r requirements.txt

COPY ./run.sh run.sh
RUN chmod +x run.sh

CMD ["/app/run.sh"]

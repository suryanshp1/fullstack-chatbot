# Use an official Python runtime as a parent image
FROM python:3.11-alpine

WORKDIR /app

COPY ./requirements.txt requirements.txt

RUN apk add --no-cache bash && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 8000

CMD ["/bin/bash", "/app/script/entrypoint.sh"]

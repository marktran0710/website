FROM python:3.8-slim-buster

WORKDIR /app

COPY . /app

COPY requirements.txt /app/requirements.txt

RUN apt-get update && \
    apt-get install -y gcc && \
    apt-get clean

RUN pip3 install -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

CMD ["python", "server.py"]
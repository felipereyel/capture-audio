FROM python:3.9-alpine

RUN mkdir /bot
WORKDIR /bot

COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY ./src ./src

CMD ["python", "-u", "-m", "src.bot"]

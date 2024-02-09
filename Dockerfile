FROM golang:1.20-alpine

WORKDIR /usr/src/app


COPY src .
RUN mkdir -p /usr/local/bin/
RUN go mod tidy
RUN go build -v -o /usr/local/bin/app

CMD ["app"]

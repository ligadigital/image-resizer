FROM node:8-alpine

RUN apk update
RUN apk add imagemagick
RUN apk add graphicsmagick
RUN apk add gifsicle

COPY . .
RUN yarn install
CMD [ "node", "bin/image-resizer.js", "--port=4000" ]

EXPOSE 4000

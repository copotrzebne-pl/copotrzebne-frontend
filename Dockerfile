FROM node:17.7.1-alpine

WORKDIR /app

COPY ./build ./build
COPY ./node_modules ./node_modules
COPY ./index.js ./index.js

CMD ["node", "index.js"]

FROM node:17.7.1-alpine AS build

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile
RUN API_URL="/api/" yarn build

# Prune dev dependencies
RUN yarn --production --frozen-lockfile

FROM node:17.7.1-alpine AS production

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/index.js ./index.js

CMD ["node", "index.js"]

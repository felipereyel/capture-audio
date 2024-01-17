FROM ghcr.io/puppeteer/puppeteer:16.1.0 AS base

FROM base as builder
WORKDIR /bot

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --ignore-scripts

COPY src ./src
RUN npm run build

FROM base as release

COPY --from=builder /bot/build ./build

CMD ["node", "build/main.js"]
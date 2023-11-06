# for arm64
# FROM --platform=linux/arm64 node:18-alpine3.18
# for arm64
# for x86
FROM node:18-alpine3.18
# for x86

WORKDIR /usr/src/server
ENV PORT=8000

COPY ./package*.json .

RUN npm install
# RUN ls
COPY ./dist ./dist
COPY ./cypress.config.ts .
COPY ./tsconfig.json .
COPY ./tsoa.json .
COPY ./src ./src

EXPOSE 8000

RUN npm run build
RUN mkdir ./dist/public
# RUN npm run swagger

WORKDIR /usr/src/server/dist
LABEL author="DVermaak"
LABEL description="JobJack server"
LABEL version="1.0"
CMD ["node", "./src/index.js"]

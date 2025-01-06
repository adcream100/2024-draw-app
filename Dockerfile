FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "preview", "--host"]

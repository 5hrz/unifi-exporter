FROM node:24.1 as builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM node:24.1-alpine
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["yarn", "start"]
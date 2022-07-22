FROM node:14.16.0 as builder

WORKDIR /app/server

COPY /server .

RUN npm install

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --production=true \
  --pure-lockfile \ 
  --non-interactive

FROM nginx

WORKDIR /app/server

COPY --from=builder /app/server  .

COPY server/nginx/nginx.conf /etc/nginx/nginx.conf
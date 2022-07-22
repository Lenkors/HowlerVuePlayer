FROM node:14.16.0 as builder

  WORKDIR /app

  COPY / .

  RUN npm install
  RUN npm run build
  
  RUN rm -rf node_modules && \
    NODE_ENV=production npm install \
    --production=true \
    --pure-lockfile \ 
    --non-interactive

FROM nginx:alpine as prod

  WORKDIR /app
  COPY --from=builder /app/dist  .
  COPY .docker/client/nginx/nginx.conf /etc/nginx/nginx.conf

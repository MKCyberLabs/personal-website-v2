# Stage 1: Build Hugo site
FROM klakegg/hugo:ext-alpine AS builder

WORKDIR /src
COPY hugo/ .

RUN hugo --minify

# Stage 2: Serve with NGINX
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/public /usr/share/nginx/html

EXPOSE 80


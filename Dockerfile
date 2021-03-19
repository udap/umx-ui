FROM nginx:latest

ADD dist/ /usr/share/nginx/html

ADD nginx.conf /etc/nginx/nginx.conf

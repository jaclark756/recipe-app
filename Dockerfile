FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/recipe-app /usr/share/nginx/html
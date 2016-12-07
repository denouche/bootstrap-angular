FROM nginx

COPY dist /usr/share/nginx/html
# Uncomment below if you need a specific Nginx configuration
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf



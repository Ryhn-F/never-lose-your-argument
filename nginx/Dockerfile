FROM nginx:1.23.3-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx after waiting for web service
CMD ["/wait-for-it.sh", "web:3000", "--", "nginx", "-g", "daemon off;"]
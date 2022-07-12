# FROM node:16-alpine as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# FROM nginx:alpine
# COPY --from=node /app/dist/pollstar /usr/share/nginx/html

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /app /usr/share/nginx/html
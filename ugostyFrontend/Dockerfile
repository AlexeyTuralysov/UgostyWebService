FROM node:20-alpine AS build
RUN apk add g++ make py3-pip

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Serve the built app
CMD ["npm", "run", "dev"]


FROM nginx:1.25.1

# Adjusting the path to /app/dist if that's where the build output is
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration if it exists
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

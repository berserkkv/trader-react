# Build Stage
FROM node:18.20.8-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Final Stage: Nginx
FROM nginx:alpine

# Copy the build directory from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

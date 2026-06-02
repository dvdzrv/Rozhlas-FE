# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Accept the argument
ARG VITE_API_URL

# Set it as an environment variable so Vite can see it during 'build'
ENV VITE_API_URL=$VITE_API_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM nginx:stable-alpine

# Copy the build output from the first stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom nginx config if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
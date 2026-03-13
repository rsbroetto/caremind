# Use Node.js 20 slim as the base image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Install 'serve' to serve the static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application using 'serve'
# The -s flag handles Single Page Application routing
CMD ["serve", "-s", "dist", "-l", "3000"]

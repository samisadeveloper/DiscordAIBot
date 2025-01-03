# Use an official Node.js runtime as a base image
FROM node:18-slim

# install ffmpeg
RUN apk add --no-cache \
  ffmpeg \
  && rm -rf /var/cache/apk/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application files into the container
COPY . .

# Run the bot when the container starts
CMD ["node", "main.js"] 

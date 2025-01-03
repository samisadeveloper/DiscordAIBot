# Use an official Node.js runtime as a base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install project dependencies
RUN npm install

FROM jrottenberg/ffmpeg:4.4-alpine

# Copy the rest of your application files into the container
COPY . .

# Run the bot when the container starts
CMD ["node", "main.js"] 

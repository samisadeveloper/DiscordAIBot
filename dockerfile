# use an official node.js runtime as a base image
from node:18-slim

# set the working directory inside the container
workdir /usr/src/app

# copy package.json and package-lock.json to install dependencies first
copy package*.json ./

# install project dependencies
run npm install
run apt-get update && apt-get install -y ffmpeg

# copy the rest of your application files into the container
copy . .

# run the bot when the container starts
cmd ["node", "main.js"]

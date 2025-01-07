# Installation

Run this commands in your server:
```
git clone https://github.com/samisadeveloper/DiscordAIBot
```
make sure to also install [FFmpeg](https://github.com/FFmpeg/FFmpeg)

# Setting up APIs
You need to sign up & generate API keys for the following:
[Google Gemini](https://aistudio.google.com/app/apikey), [Discord API](https://discord.com/developers/applications), [Eleven Labs](https://elevenlabs.io/app/settings/api-keys)

Once signed up, create a .env file in the root directory of the project with the following:

```
GOOGLE_GEMINI_KEY=YOUR_KEY
DISCORD_API_KEY=YOUR_KEY
ELEVEN_LABS_API=YOUR_KEY
VOICE_ID=eleven_labs_voice_id
```

# Docker
Once you've set up APIs and included them in your .env file you need to install [docker](https://github.com/docker) on the server you'll be running your bot on.
As soon as docker is installed, enter the project root directory again and run the following to build and run it:
```
sudo docker build -t discord-bot .
sudo docker run -d --name discord-bot --restart unless-stopped discord-bot
```

# Updating
Whenever the project is out of date use the following to pull changes.
```
git pull origin master
```

Then you need to rebuild & replace the docker instance
```
sudo docker build -t discord-bot .
sudo docker stop discord-bot
sudo docker rm discord-bot
sudo docker run -d --name discord-bot --restart unless-stopped discord-bot
```

# Troubleshooting
Ensure that the .env file is correctly setup with the right keys.

Use the following to ensure the docker instance is running
```
sudo docker ps
```

Use the following to check for errors in the instance:
```
sudo docker logs discord-bot
```

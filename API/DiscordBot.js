const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require("dotenv");

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

client.login(process.env.DISCORD_API_KEY);

module.exports = client;

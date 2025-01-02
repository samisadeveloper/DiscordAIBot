const client = require("./API/DiscordBot.js");

module.exports = client;
const { onChat } = require("./listeners/chat.js");

client.on('messageCreate', onChat);

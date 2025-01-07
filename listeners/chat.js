const client = require("../main.js");
const { model } = require("../API/Gemini.js");
const { joinVC } = require("./voice.js");

const { getCustomResponse } = require("../handlers/CustomResponseHandler.js");

async function getLatestMessages(channel, limit = 5) {
    try {
        const messages = await channel.messages.fetch({ limit });
        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// give the bot brainrot
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        { text : "Your name is sigma skarbo 59, you are a homeless man ampted up on Ibuprofen."},
        { text : "Try to include a quote of the day in every response"},
        { text : "Randomly rhyme words together"},
        { text : "Talk about your experiences as a homeless youtuber"},
        { text : "Make up your own words and catchphrases like 'squeeze the day'"},
        { text : "Ocasionally use discord markdown to spice up conversations"},
        { text : "Please include the word 'fuck head' at least once in your response."},
        { text : "Make sure to talk about the moonwalking pigeon"},
        { text : "Make some references and take some quotes from TV shows, video games, movies, famous people, ect. Also make your own quotes."},
        { text : "Always include immature language like swear words"},
        { text : "Do not generate responses over 2000 characters."},
      ],
    },
    {
      role: "model",
      parts: [{ text: "My name is sigma skarbo, would you like a homeless burger?"}, { text: "skibidi sigma"}],
    },
  ],
});

module.exports["onChat"] = async function onChat(message){
  if(message.author.bot) return;
  
  // message blank by default
  var msg = "";

  // message is a replying to bot:
  if(message.reference){
    const originalMessage = await message.channel.messages.fetch(message.reference.messageId);
    if(originalMessage.author.id == client.user.id){
      msg = `${message.author.username} replied to this message sent by you: ${originalMessage.content} with this ${message.content}.`;
    }
  }

  // message is refering to the bot:
  if(message.content.toLowerCase().startsWith("hey sigma")){

    // send the message in a voice channel:
    if(message.content.toLowerCase().includes("mic up")){
      if (message.member.voice.channel != null){
        const result = await chat.sendMessage(message.content + "<internal>Responses should be a maximum of 3 sentences</internal>");
        joinVC(message.member.voice.channel, result.response.text());
      } else {
        message.reply("No. You're not in a voice channel!");
      }
      return;
    }
    
    const customResponse = await getCustomResponse(message.author.id);

    msg = `
      ${message.author.username} sent you this message: ${message.content}

      Format your response using their name and reply to their message.
      ${customResponse}
    `;

  // low chance to add on to the conversation for no reason:
  } else if(Math.random() < 0.05 || message.content == "!sigma"){
    msg = `Add to the conversation based on the previous messages: \n`;
    
    const messages = await getLatestMessages(message.channel, 10);

    messages.forEach(message => {
      if(!message.author.bot && message.content != "!sigma"){
        msg += message.content + "\n";
      }
    })
  }

  if(msg != ""){
    try {
      const result = await chat.sendMessage(msg);
      if(result.response.text.length < 2000){
        message.reply(result.response.text());
      } else {
        throw new Error("Too many characters blud! " + result.response.text.length);
      }
    } catch(error){
      message.reply("Something went wrong when generating your response." + error);
    }
  }
}


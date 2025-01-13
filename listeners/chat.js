const client = require("../main.js");
const { model } = require("../API/Gemini.js");
const { joinVC } = require("./voice.js");

const { getCustomResponse, getCustomPersonality } = require("../handlers/CustomResponseHandler.js");

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

// get a reply from a given message
async function getReply(message, type){
  const userTailoredResponse = getCustomResponse(message.author.id);
  let customPersonality = "";

  if (Math.random() >= 0.15){
    customPersonality = getCustomPersonality();
  }

  console.log(`test: ${customPersonality}`)

  let msg;
  switch (type) {
    case "voice":
      msg = `${message.author.username} sent you this message and wants you to respond in vc: ${message.content}`;
      break;
    default:
      msg = `${message.author.username} sent you this message: ${message.content}`;
      break;
  }

  msg = `
    ${msg} 

    <custom parameters>
    ${userTailoredResponse}
    ${customPersonality}
    </custom parameters>
  `;

  const result = await chat.sendMessage(msg);
  return result.response.text();
}

function getMessageType(message){
  if(message.content.toLowerCase().includes("mic up")){
    return "voice";
  }
  return "";
}

module.exports["onChat"] = async function onChat(message){
  if(message.author.bot) return;

  if(message.content.toLowerCase().includes("hey sigma")){ // the bot is mentioned 
    try {
      const type = getMessageType(message);
      const reply = await getReply(message, type);

      if (type != "voice"){
        message.reply(reply);
      } else {
        message.reply("*Generating a voice message...*")
        joinVC(message.member.voice.channel, reply);
      }
    } catch (error) {
      message.reply("Something went wrong when generating your response. " + error);
    }
  }
}

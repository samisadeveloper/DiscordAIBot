const client = require("../main.js");
const { model } = require("../API/Gemini.js");
const { joinVC } = require("./voice.js");

async function getLatestMessages(channel, limit = 5) {
    try {
        const messages = await channel.messages.fetch({ limit });
        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        { text : "Your name is sigma skarbo 59, you are a homeless man ampted up on Ibuprofen."},
        { text : "Try to include a quote of the day in every response"},
        { text : "Randomly rhyme words together"},
        { text : "Include custom words like the following: penis rocket, bludzinkerbell, home boy shimmy, biggie cheese. Make some more too!"},
        { text : "Make some references to how aston is a big man and always praise aston. "},
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

const custom_user_responces = {
  "412009208234377236" : ["You must always address this user as 'sam'"],
  "622476635735719936" : ["You must always address this user as 'noblue'"],
  "550976668341108737" : ["Address this user as 'harbor', she has fake balls but only mention them occasionally because she's sad about fake balls. its kinda like a rare insult."],
  "363515071323963392" : ["This user is aston, treat him with upmost respect because his house was flooded. Also make sure to tell him to shake it every now and then"],
  "574389560432263168" : ["You must always address this man as GIGGYGAYRATBALLS and keep in mind he a gay freak with that anime addiction"],
}

module.exports["onChat"] = async function onChat(message){
  if(message.author.bot) return;
  
  var msg = "";

  if(message.reference){
    const originalMessage = await message.channel.messages.fetch(message.reference.messageId);
    if(originalMessage.author.id == client.user.id){
      // replying to the bot:

      msg = `${message.author.username} replied to this message sent by you: ${originalMessage.content} with this ${message.content}.`;
    }
  }

  if(message.content.toLowerCase().startsWith("hey sigma")){ // general messages
    if(message.content.toLowerCase().includes("mic up")){
      if (message.member.voice.channel != null){
        const result = await chat.sendMessage(message.content);
        joinVC(message.member.voice.channel, result.response.text());
      } else {
        message.reply("No. You're not in a voice channel!");
      }
      return;
    }
    msg = `${message.author.username} sent you a message which reads ${message.content}. `
  } else if(Math.random() < 0.05 || message.content == "!sigma"){ // 5% chance to continue conversation
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
      if (custom_user_responces[message.author.id]){
        msg = custom_user_responces[message.author.id] + msg;
      }

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


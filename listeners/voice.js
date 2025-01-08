const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { saveAudio } = require('../handlers/TTSHandler.js');

async function handleTTS(message, connection){
  const player = createAudioPlayer();

  await saveAudio(message); 
  const resource = createAudioResource('/tmp/tts_output.mp3');
  player.play(resource);

  connection.subscribe(player);
}

module.exports["joinVC"] = async function joinVC(channel, message) {
  let connection = getVoiceConnection(channel.guild.id);

  if (connection != null){
    console.log("Already in a voice channel I think");
    handleTTS(message, connection);
    return;
  }

  try {
    connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    console.log('Voice connection created successfully!');
  } catch (error) {
    console.error('Error creating voice connection:', error);
    return;
  }

  connection.on(VoiceConnectionStatus.Ready, async () => {
    console.log('The bot has successfully connected to the channel!');
      handleTTS(message, connection);
    });
  connection.on(VoiceConnectionStatus.Disconnected, () => {
    connection.destroy()
  })
}

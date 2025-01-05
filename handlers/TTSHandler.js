const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv'); 

const API_KEY = process.env.ELEVEN_LABS_API; 
const VOICE_ID = process.env.VOICE_ID;

// Function to generate TTS (Text to Speech) from ElevenLabs
async function textToSpeech(message) {
  try {
    const options = {
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': API_KEY,
      },
      data: {
        text: message,
      },
      responseType: 'arraybuffer', // Fetch audio as binary data
    };

    // Send the POST request to the API and get the audio data
    const response = await axios.request(options);

    return response.data; // Return the binary audio data
  } catch (error) {
    console.error('Error fetching TTS:', error.message);
    return null;
  }
}

// Function to fetch the audio and save it as a file
module.exports["saveAudio"] = async function saveAudio(message) {
  console.log("Attempting to save audio...");
  const audioData = await textToSpeech(message); // Get the audio data
  
  if (audioData) {
    try {
      // Create a Blob-like object from the audio data
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      
      // Save the audio as a file (e.g., 'audio_output.mp3')
      fs.writeFileSync('/tmp/tts_output.mp3', Buffer.from(audioData));
      console.log('Audio saved successfully as "audio_output.mp3"!');
    } catch (error) {
      console.error('Error saving audio:', error.message);
    }
  } else {
    console.error('No audio data received');
  }
}

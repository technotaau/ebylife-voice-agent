// scripts/setup-voice.js
require('dotenv').config();
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function cloneVoice(name, voiceSamplePath) {
  const form = new FormData();
  form.append('name', name);
  form.append('files', fs.createReadStream(voiceSamplePath));
  form.append('description', 'Martin Ebner - EbyLife Head Trainer');

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        ...form.getHeaders(),
      },
      body: form,
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Voice cloned successfully!');
      console.log('Voice ID:', data.voice_id);
      console.log('\n⚠️  Add this to your .env file:');
      console.log(`ELEVENLABS_VOICE_ID=${data.voice_id}`);
    } else {
      console.error('❌ Error:', data);
    }
  } catch (error) {
    console.error('❌ Failed to clone voice:', error);
  }
}

// Check if voice sample path is provided
if (process.argv.length < 3) {
  console.log('Usage: node scripts/setup-voice.js <path-to-voice-sample>');
  process.exit(1);
}

cloneVoice('Martin Ebner', process.argv[2]);
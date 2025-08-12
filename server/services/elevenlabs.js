const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.voiceId = process.env.ELEVENLABS_VOICE_ID;
    this.apiUrl = 'https://api.elevenlabs.io/v1';
  }

  async textToSpeech(text) {
    try {
      const response = await fetch(
        `${this.apiUrl}/text-to-speech/${this.voiceId}/stream`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              style: 0.5,
              use_speaker_boost: true
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      console.error('ElevenLabs Error:', error);
      throw error;
    }
  }

  async getVoices() {
    try {
      const response = await fetch(`${this.apiUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }
}

module.exports = new ElevenLabsService();
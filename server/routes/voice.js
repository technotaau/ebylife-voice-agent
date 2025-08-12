const express = require('express');
const router = express.Router();
const elevenLabs = require('../services/elevenlabs');

// Text to speech endpoint
router.post('/synthesize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Set appropriate headers for audio streaming
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Transfer-Encoding', 'chunked');

    const audioStream = await elevenLabs.textToSpeech(text);
    audioStream.pipe(res);
  } catch (error) {
    console.error('Voice synthesis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get available voices
router.get('/voices', async (req, res) => {
  try {
    const voices = await elevenLabs.getVoices();
    res.json(voices);
  } catch (error) {
    console.error('Error getting voices:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
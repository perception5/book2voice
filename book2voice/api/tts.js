// api/tts.js (Vercel) or functions/tts.js (Netlify)
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { text } = req.body;
  if (!text) return res.status(400).send('No text provided');

  try {
    const response = await fetch('https://elevenlabs.io/app/voice-library?voiceId=zA6D7RyKdc2EClouEMkPD', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.bba42ab814d41f65a15ab62c7797654bbd948497fe47991c2c5b848ba7d28094Y, // Keep API key secret
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error('TTS API error');

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

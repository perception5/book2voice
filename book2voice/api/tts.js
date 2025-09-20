import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const { text } = req.body;
    if (!text) return res.status(400).end('No text provided');

    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/zA6D7RyKdc2EClouEMkP', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.bba42ab814d41f65a15ab62c7797654bbd948497fe47991c2c5b848ba7d28094,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error('TTS API error');

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.end(Buffer.from(audioBuffer));

  } catch (err) {
    console.error(err);
    res.status(500).end(err.message);
  }
}

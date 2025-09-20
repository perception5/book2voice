const speakBtn = document.getElementById('speakBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayer = document.getElementById('audioPlayer');
const textInput = document.getElementById('textInput');
const downloadLink = document.getElementById('downloadLink');

let currentBlobUrl = null;

const ELEVENLABS_API_KEY = 'YOUR_API_KEY_HERE'; // <-- replace with your key
const VOICE_ID = 'YOUR_VOICE_ID_HERE'; // <-- replace with your chosen voice ID

async function generateSpeech() {
  const text = textInput.value.trim();
  if (!text) return alert('Please enter some text.');

  speakBtn.disabled = true;

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error('TTS API error');

    const audioData = await response.arrayBuffer();
    const blob = new Blob([audioData], { type: 'audio/mpeg' });

    if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = URL.createObjectURL(blob);

    audioPlayer.src = currentBlobUrl;
    audioPlayer.play();

    downloadLink.href = currentBlobUrl;
    downloadLink.download = 'tts.mp3';
    downloadLink.textContent = 'Download';
    downloadLink.style.display = 'inline-block';

  } catch (err) {
    alert(err.message);
  } finally {
    speakBtn.disabled = false;
  }
}

speakBtn.addEventListener('click', generateSpeech);

stopBtn.addEventListener('click', () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});

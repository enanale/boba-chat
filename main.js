import './style.css'
import { initFace } from './src/face.js'
import { initVoice } from './src/voice.js'
import { initChat } from './src/chat.js'
import { initAudio } from './src/audio.js'

document.addEventListener('DOMContentLoaded', async () => {
    initFace();
    initVoice();
    initAudio();
    await initChat();
});

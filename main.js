import './style.css'
import { initFace } from './src/face.js'
import { initVoice } from './src/voice.js'
import { initChat } from './src/chat.js'

document.addEventListener('DOMContentLoaded', async () => {
    initFace();
    initVoice();
    await initChat();
});

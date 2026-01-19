export async function initChat() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container');
    const micBtn = document.getElementById('mic-btn');

    // AI Integration - Initialized early to prevent race conditions
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const { BOBA_PERSONA_PROMPT } = await import('./persona.js');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerHTML = `<span class="prefix">SYSTEM></span> <span class="content">ERROR: VITE_GEMINI_API_KEY NOT FOUND.</span>`;
        container.appendChild(msgDiv);
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
        systemInstruction: BOBA_PERSONA_PROMPT
    });

    const chatSession = model.startChat({
        history: []
    });

    // --- Helper Functions ---

    async function addMessage(sender, text, typeEffect = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerHTML = `<span class="prefix">${sender}></span> <span class="content"></span>`;
        container.appendChild(msgDiv);
        const contentSpan = msgDiv.querySelector('.content');

        if (text.includes('```')) {
            const parts = text.split('```');
            for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 1) { // Code block
                    const pre = document.createElement('pre');
                    pre.className = 'ascii-art';
                    const code = parts[i].replace(/^[a-z]+\n/i, '');
                    pre.textContent = code;
                    contentSpan.appendChild(pre);
                    if (window.playKeyClick) window.playKeyClick();
                } else if (parts[i].trim()) {
                    const span = document.createElement('span');
                    span.textContent = parts[i];
                    contentSpan.appendChild(span);
                }
            }
        } else if (typeEffect) {
            const chars = text.split('');
            for (const char of chars) {
                contentSpan.textContent += char;
                if (window.playKeyClick) window.playKeyClick();
                container.scrollTop = container.scrollHeight;
                await new Promise(r => setTimeout(r, 20 + Math.random() * 30));
            }
        } else {
            contentSpan.textContent = text;
        }

        container.scrollTop = container.scrollHeight;
    }

    async function processResponse(text) {
        window.setFace('thinking');

        try {
            const result = await chatSession.sendMessage(text);
            const response = await result.response;
            const responseText = response.text().toUpperCase();

            await addMessage('BOBA', responseText, true);
            window.speak(responseText);
        } catch (error) {
            console.error('Gemini API Error:', error);

            let displayError = "ERROR: CONNECTION TO BOBA-CORE INTERRUPTED.";
            const msg = error.message || "";

            if (msg.includes('429')) {
                displayError = "ERROR: SYSTEM OVERLOAD. RATE LIMIT EXCEEDED.";
            } else if (msg.includes('404')) {
                displayError = "ERROR: BOBA-CORE MODEL NOT FOUND.";
            } else if (msg.includes('API_KEY_INVALID')) {
                displayError = "ERROR: UNAUTHORIZED ACCESS. API KEY REJECTED.";
            }

            await addMessage('SYSTEM', displayError, true);
            if (window.speak) window.speak(displayError);
        } finally {
            window.setFace('neutral');
        }
    }

    // --- Command Handling ---

    const handleCommand = async (text) => {
        if (text.startsWith('/style ')) {
            const style = text.split(' ')[1].toLowerCase();
            if (window.setFaceStyle(style)) {
                await addMessage('SYSTEM', `FACE MODULE RECONFIGURED TO: ${style.toUpperCase()}`, true);
            } else {
                await addMessage('SYSTEM', `ERROR: STYLE '${style.toUpperCase()}' NOT FOUND.`, true);
            }
            return true;
        }
        if (text.startsWith('/draw ')) {
            const prompt = text.replace('/draw ', '').trim();
            await processResponse(`Create a small, simple ASCII art of ${prompt} suitable for a terminal output. Wrap it in triple backticks.`);
            return true;
        }
        return false;
    };

    // --- Event Listeners ---
    // Added AFTER initialization to ensure chatSession is ready

    input.addEventListener('keydown', async (e) => {
        if (window.playKeyClick) window.playKeyClick();

        if (e.key === 'Enter' && input.value.trim() !== '') {
            const text = input.value.trim();
            input.value = '';

            if (await handleCommand(text)) return;

            await addMessage('USER', text);
            await processResponse(text);
        }
    });

    if (micBtn) {
        micBtn.addEventListener('click', () => {
            if (window.startListening) window.startListening();
        });
    }
}

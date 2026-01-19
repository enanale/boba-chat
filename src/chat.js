export async function initChat() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container');
    const micBtn = document.getElementById('mic-btn');

    // Command Dispatcher
    const handleCommand = (text) => {
        if (text.startsWith('/style ')) {
            const style = text.split(' ')[1].toLowerCase();
            if (window.setFaceStyle(style)) {
                addMessage('SYSTEM', `FACE MODULE RECONFIGURED TO: ${style.toUpperCase()}`);
            } else {
                addMessage('SYSTEM', `ERROR: STYLE '${style.toUpperCase()}' NOT FOUND.`);
            }
            return true;
        }
        return false;
    };

    // User Input Handling
    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const text = input.value.trim();
            input.value = '';

            if (handleCommand(text)) return;

            addMessage('USER', text);
            await processResponse(text);
        }
    });

    // Mic Button Handling (Consolidated)
    if (micBtn) {
        micBtn.addEventListener('click', () => {
            if (window.startListening) window.startListening();
        });
    }

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerHTML = `<span class="prefix">${sender}></span> ${text}`;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    // AI Integration
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const { BOBA_PERSONA_PROMPT } = await import('./persona.js');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
        addMessage('SYSTEM', "ERROR: VITE_GEMINI_API_KEY NOT FOUND. UPDATE .env FILE.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
        systemInstruction: BOBA_PERSONA_PROMPT
    });

    async function processResponse(text) {
        window.setFace('thinking');

        try {
            const result = await model.generateContent(text);
            const response = await result.response;
            const responseText = response.text().toUpperCase();

            addMessage('BOBA', responseText);
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

            addMessage('SYSTEM', displayError);
            if (window.speak) window.speak(displayError);
        } finally {
            window.setFace('neutral');
        }
    }
}

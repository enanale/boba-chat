export async function initChat() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container');

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const text = input.value.trim();
            input.value = '';

            if (text.startsWith('/style ')) {
                const style = text.split(' ')[1].toLowerCase();
                if (window.setFaceStyle(style)) {
                    addMessage('SYSTEM', `FACE MODULE RECONFIGURED TO: ${style.toUpperCase()}`);
                } else {
                    addMessage('SYSTEM', `ERROR: STYLE '${style.toUpperCase()}' NOT FOUND.`);
                }
                return;
            }

            addMessage('USER', text);
            await processResponse(text);
        }
    });

    const micBtn = document.getElementById('mic-btn');
    if (micBtn) {
        micBtn.addEventListener('click', () => {
            window.startListening();
        });
    }

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerHTML = `<span class="prefix">${sender}></span> ${text}`;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const { BOBA_PERSONA_PROMPT } = await import('./persona.js');

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    // Choosing gemini-2.0-flash-lite as the most stable current option for both 404 and 429 avoidance
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
        systemInstruction: BOBA_PERSONA_PROMPT
    });

    async function processResponse(text) {
        if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_key_here') {
            const errorMsg = "ERROR: GEMINI API KEY NOT FOUND. PLEASE CHECK .env FILE.";
            addMessage('SYSTEM', errorMsg);
            window.speak(errorMsg);
            window.setFace('neutral');
            return;
        }

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

            if (error.message && error.message.includes('429')) {
                displayError = "ERROR: SYSTEM OVERLOAD. RATE LIMIT EXCEEDED. PLEASE WAIT 60 SECS.";
            } else if (error.message && error.message.includes('404')) {
                displayError = "ERROR: BOBA-CORE MODEL NOT FOUND. RECONFIGURING SUBNET...";
            } else if (error.message && error.message.includes('API_KEY_INVALID')) {
                displayError = "ERROR: UNAUTHORIZED ACCESS. API KEY REJECTED.";
            }

            addMessage('SYSTEM', displayError);
            window.speak(displayError);
            window.setFace('neutral');
        } finally {
            window.setFace('neutral');
        }
    }
}

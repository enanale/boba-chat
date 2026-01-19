export async function initChat() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container');

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const text = input.value.trim();
            input.value = '';

            addMessage('USER', text);
            await processResponse(text);
        }
    });

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        // Classic "typing" effect or just immediate? 
        // For Apple II+ vibe, we'll do line-by-line.
        msgDiv.innerHTML = `<span class="prefix">${sender}></span> ${text}`;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: "You are BOBA, a friendly AI companion from the 80s living in an Apple II+. You are helpful, kind, and have a slight obsession with boba tea. You speak in ALL CAPS to match your monochrome CRT display. Keep your responses concise and friendly."
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
            console.error(error);
            addMessage('SYSTEM', "ERROR: CONNECTION TO BOBA-CORE INTERRUPTED.");
        } finally {
            window.setFace('neutral');
        }
    }
}

export function initVoice() {
    console.log("Initializing Web Speech API...");

    // We'll expose simple speak and listen functions
    window.speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 0.8; // Lower pitch for that "vintage computer" feel

        utterance.onstart = () => window.setFace('speaking');
        utterance.onend = () => window.setFace('neutral');

        window.speechSynthesis.speak(utterance);
    };

    window.startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => window.setFace('listening');
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const inputField = document.getElementById('user-input');
            inputField.value = transcript;
            // Trigger chat submit
            inputField.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
        };
        recognition.onend = () => window.setFace('neutral');

        recognition.start();
    };
}

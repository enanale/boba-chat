export function initVoice() {
    console.log("Initializing Web Speech API...");

    // Unified speak and listen functions
    window.speak = (text) => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel(); // Stop any current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 0.8;

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
            if (inputField) {
                inputField.value = transcript;
                inputField.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
            }
        };
        recognition.onend = () => window.setFace('neutral');

        recognition.start();
    };
}

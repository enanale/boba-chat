export function initFace() {
    const container = document.getElementById('face-container');

    const faces = {
        neutral: "[ o _ o ]",
        happy: "[ ^ _ ^ ]",
        thinking: "[ . _ . ]",
        speaking: "[ o 0 o ]",
        listening: "[ > _ < ]"
    };

    container.textContent = faces.neutral;

    window.setFace = (type) => {
        if (faces[type]) {
            container.textContent = faces[type];
            // Add a little phosphor pulse on change
            container.style.animation = 'none';
            container.offsetHeight; // trigger reflow
            container.style.animation = 'pulse 0.2s';
        }
    };
}

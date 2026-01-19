export function initFace() {
    const container = document.getElementById('face-container');

    const themes = {
        classic: {
            neutral: "] o _ o [",
            happy: "] ^ _ ^ [",
            thinking: "] . _ . [",
            speaking: "] o 0 o [",
            listening: "] > _ < ["
        },
        blocky: {
            neutral: "[ ### ### ]",
            happy: "[ ### ^ ### ]",
            thinking: "[ ... _ ... ]",
            speaking: "[ ### 0 ### ]",
            listening: "[  >  _  <  ]"
        },
        kaomoji: {
            neutral: "[ O   _   O ]",
            happy: "[ ^   W   ^ ]",
            thinking: "[ .   _   . ]",
            speaking: "[ O   O   O ]",
            listening: "[ >   _   < ]"
        },
        system: {
            neutral: "< -   _   - >",
            happy: "< \\   _   / >",
            thinking: "< .   _   . >",
            speaking: "< O   _   O >",
            listening: "< |   _   | >"
        }
    };

    let currentTheme = 'classic';
    let currentType = 'neutral';

    container.textContent = themes[currentTheme].neutral;

    window.setFaceStyle = (style) => {
        if (themes[style]) {
            currentTheme = style;
            container.textContent = themes[currentTheme][currentType];
            triggerPulse();
            return true;
        }
        return false;
    };

    window.setFace = (type) => {
        if (themes[currentTheme][type]) {
            currentType = type;
            container.textContent = themes[currentTheme][type];
            triggerPulse();
        }
    };

    function triggerPulse() {
        container.style.animation = 'none';
        container.offsetHeight; // trigger reflow
        container.style.animation = 'pulse 0.2s';
    }
}

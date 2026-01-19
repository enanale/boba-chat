export function initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    let audioCtx = null;

    const createClick = () => {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Mechanical "clack" is complex, but we can simulate it with a very short filtered noise or square wave
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        // Add some high frequency "ping"
        const ping = audioCtx.createOscillator();
        const pingGain = audioCtx.createGain();
        ping.type = 'sine';
        ping.frequency.setValueAtTime(800, audioCtx.currentTime);
        pingGain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        pingGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        ping.connect(pingGain);
        pingGain.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);

        ping.start();
        ping.stop(audioCtx.currentTime + 0.05);
    };

    window.playKeyClick = createClick;
}

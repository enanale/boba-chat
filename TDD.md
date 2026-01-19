# Boba Chat - Technical Design Document (TDD)

## Architecture Overview
Boba Chat is a minimalist Single Page Application (SPA) built with Vite and Vanilla JavaScript. It emphasizes high-fidelity CSS for retro visual effects and utilizes a modular architecture for AI, UI, and Voice components.

## Tech Stack
- **Frontend**: Vite + Vanilla JavaScript.
- **AI Integration**: Google Generative AI SDK using `model.startChat()` for session history.
- **Voice UI**: Web Speech API (`SpeechRecognition` and `SpeechSynthesis`).
- **Audio**: Web Audio API for mechanical keyboard sound synthesis.
- **Styling**: Vanilla CSS with CRT tokens and `VT323` pixel font.

## Key Technical Decisions
- **Stable AI Routing**: Uses `gemini-2.0-flash-lite` for stability and high quota availability.
- **Persona Management**: System prompts isolated in `src/persona.js` to separate "brain" from "logic".
- **Responsive ASCII Scaling**: Uses CSS `clamp()` and `vw` units to ensure the typography-based face never wraps or clips.
- **Command Dispatcher**: Input parsing for slash commands (`/style`, `/draw`) for UI customization and ASCII art.
- **Unified Event Handling**: Consolidated UI events and initialization logic to prevent race conditions.
- **Synthesized Audio**: Web Audio API generates "clack" sounds on the fly, avoiding heavy audio asset loads.

## File Structure
- `src/persona.js`: System instruction branding.
- `src/face.js`: ASCII theme management and animation triggers.
- `src/voice.js`: Speech API wrappers.
- `src/audio.js`: Mechanical keyboard audio synthesis.
- `src/chat.js`: Central logic, API interaction, and command handling.
- `style.css`: CRT physics, VT323 typography, and responsive rules.

## Final Implementation Status
- ✅ Voice Interaction (STT/TTS).
- ✅ Face Style Selector.
- ✅ ASCII Art Generator (`/draw`).
- ✅ Mechanical Keyboard Audio Synthesis.
- ✅ Conversational Session Memory.
- ✅ Mobile-Responsive CRT Overlay.
- ✅ Gen-X / Tron Persona Integration.

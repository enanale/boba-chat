# Boba Chat - Technical Design Document (TDD)

## Architecture Overview
Boba Chat is a minimalist Single Page Application (SPA) built with Vite and Vanilla JavaScript. It emphasizes high-fidelity CSS for retro visual effects and utilizes a modular architecture for AI, UI, and Voice components.

## Tech Stack
- **Frontend**: Vite + Vanilla JavaScript.
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`) using `gemini-2.0-flash-lite`.
- **Voice UI**: Web Speech API (`SpeechRecognition` and `SpeechSynthesis`).
- **Styling**: Vanilla CSS with custom Green CRT tokens (#00FF41).

## Key Technical Decisions
- **Stable AI Routing**: Uses `gemini-2.0-flash-lite` for stability and high quota availability.
- **Persona Management**: System prompts isolated in `src/persona.js` to separate "brain" from "logic".
- **Responsive ASCII Scaling**: Uses CSS `clamp()` and `vw` units to ensure the typography-based face never wraps or clips.
- **Command Dispatcher**: Input parsing for slash commands (e.g., `/style`) for UI customization.
- **Unified Event Handling**: Consolidated UI events in `chat.js` for better maintainability.

## File Structure
- `src/persona.js`: System instruction branding.
- `src/face.js`: ASCII theme management and animation triggers.
- `src/voice.js`: Speech API wrappers.
- `src/chat.js`: Central logic, API interaction, and command handling.
- `style.css`: CRT physics and responsive layout rules.

## Final Implementation Status
- ✅ Voice Interaction (STT/TTS).
- ✅ Face Style Selector.
- ✅ Robust 429/404 Error Handling.
- ✅ Mobile-Responsive CRT Overlay.
- ✅ Gen-X Persona Tuning.

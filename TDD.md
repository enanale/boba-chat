# Boba Chat - Technical Design Document (TDD)

## Architecture Overview
Boba Chat will be built as an ultra-minimalist SPA using Vite and Vanilla JS/CSS. The design will leverage modern CSS for retro effects (scanlines, glows, pixelation).

## Tech Stack
- **Frontend**: Vite + Vanilla JavaScript.
- **Voice**: Web Speech API.
- **Styling**: Vanilla CSS with a strict monochrome green palette (#00FF41 on #000). Extensive use of `text-shadow` for phosphor glow and CSS overlays for scanlines and CRT curvature.
- **Typography**: Monospaced or blocky retro-computing fonts (e.g., VT323, Apple II pixel fonts).

## Technical Requirements
- Node.js environment.
- Responsive layout (mobile-first).
- Secure handling of API keys (Environment variables).

## Key Decisions
- **Vite/Vanilla**: Minimal overhead, fast development, and total control over the DOM.
- **Web Speech API**: built-in browser support for voice interaction without extra libraries.
- **Expressive Typography**: Using variable fonts and CSS animations to create "character".

## Data Model
- `Message`: { role: 'user' | 'assistant', content: string, timestamp: Date }
- `Persona`: Configurable system prompts.

## Future Enhancements
- Chat history persistence (Firebase or local storage).
- Voice interaction.
- Image generation capability.

# 🍏 Boba Chat: Apple II+ Edition

A friendly, minimalist AI companion with a nostalgic Apple II+ monochrome green CRT aesthetic.

![Boba Chat Preview](/Users/enanale/.gemini/antigravity/brain/30c12f4a-68f2-45cc-9654-63ce3d75fdfe/boba_final_response_1768839367225.png)

## 🕹️ Features

- **Retro Aesthetics**: Phosphor green monochrome UI with CRT scanlines, flicker, and phosphor glow.
- **Expressive Character**: A typography-based AI "face" that changes expressions based on sentiment and state.
- **Voice UI**: Integrated Speech-to-Text (STT) and Text-to-Speech (TTS) for a true "vintage computer friend" experience.
- **Powered by Gemini**: Uses Google's Gemini 2.0 Flash for snappy, intelligent, and friendly responses.
- **Ultra-Minimal**: Built with Vite and Vanilla JS/CSS for zero bloat.

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 2. Installation
\`\`\`bash
git clone https://github.com/your-username/boba-chat.git
cd boba-chat
npm install
\`\`\`

### 3. Configuration
Create a `.env` file in the root directory:
\`\`\`env
VITE_GEMINI_API_KEY=your_actual_key_here
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## 🔧 Tech Stack

- **Frontend**: Vite + Vanilla JavaScript
- **Voice**: Web Speech API
- **AI Integration**: `@google/generative-ai` SDK
- **Styling**: Vanilla CSS (CRT Effects, custom animations)

## 📜 License

MIT License - feel free to build your own retro-future companions!

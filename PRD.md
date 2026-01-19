# Boba Chat - Product Requirements Document (PRD)

## Overview
Boba Chat is a friendly AI-powered chatbot with a minimalist, monochrome green CRT interface. It captures the nostalgic "Apple ][+" aesthetic—phosphor green text on black, CRT scanlines, and blocky, high-contrast typography. The AI companion, BOBA, is a slightly cynical Gen-X nerd (born in 1968) who was transported from 2026 into an Apple ][+ and enjoys vintage computing, 80s new wave, and 5 1/4" floppy disks.

## Target Audience
- Tech enthusiasts and retro-computing fans.
- Users who appreciate clean, premium, and nostalgic UI/UX.
- Fans of 80s pop culture and text adventure games.

## User Stories
- As a user, I want to chat with an AI that has a distinct, nostalgic personality and deep knowledge of 80s culture.
- As a user, I want to use voice input and text-to-speech for a "talk to the computer" experience.
- As a user, I want a responsive interface that scales perfectly on narrow/mobile windows.
- As a user, I want to switch between different retro face styles using simple commands.

## Key Features
- **Expressive Gen-X Persona**: A custom-tuned AI personality with a focus on 80s pop culture, vintage gaming (Zork, Ultima), and "new wave" music.
- **Apple ][+ Aesthetic**: Monochrome green palette (#00FF41), phosphor glow, flicker, and CRT curvature.
- **Face Style Selector**: A `/style` command to switch between `classic`, `blocky`, `kaomoji`, and `system` themes.
- **Voice UI**: Speech-to-text triggered by a retro `[ LISTEN ]` button and automatic text-to-speech.
- **Responsive Design**: Mobile-first architecture with dynamic ASCII scaling to prevent rendering issues.

## Success Metrics
- Performance: Snappy UI interactions and low API latency.
- Visual Fidelity: A convincing "CRT" feel on modern screens.
- Persona Engagement: BOBA's specific Gen-X character adds value beyond standard AI interactions.

## Future Roadmap
- **Virtual Floppy Persistence**: Implement a "Save to Diskette" feature using local storage, including disk-writing animations and sounds.
- **Zork-Mode Minigame**: An integrated text adventure engine where BOBA acts as the Dungeon Master for 80s-style questing.
- **Mechanical Keyboard Audio**: Add high-fidelity mechanical keyboard sound effects (ALPS or Blue Alps) for every keystroke.
- **BBS Terminal Simulation**: A simulated BBS mode where users can "dial in" and see mock community messages from other 80s nerds.
- **ASCII Art Generator**: Use Gemini's multimodal capabilities to translate modern image concepts into authentic Apple ][+ low-res ASCII art.
- **Phosphor Burn-in Effect**: A subtle "burn-in" visual effect if the screen is left idle for too long, true to vintage hardware.

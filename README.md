# Voice Notes

A mobile app for recording and transcribing voice notes. Record audio, get an automatic transcription and summary powered by OpenAI, and browse your notes locally — no account required.

## Features

- Record voice notes with a single tap
- Automatic transcription via OpenAI Whisper
- AI-generated summary (1–2 sentences) via GPT-4o mini
- All notes stored locally on-device with SQLite
- Playback recordings directly from the note list

## Tech Stack

| | |
|---|---|
| Framework | React Native (Expo) |
| Language | TypeScript |
| Navigation | React Navigation (native stack) |
| Local storage | expo-sqlite |
| Audio | expo-av |
| UI components | react-native-paper |
| Transcription | OpenAI Whisper API |
| Summarization | OpenAI GPT-4o mini |

## Getting Started

### Prerequisites

- Node.js
- Expo Go app on your phone, or an Android/iOS simulator

### Install

```bash
npm install
```

### Environment

Create a `.env.local` file in the project root:

```
EXPO_PUBLIC_OPENAI_KEY=your_openai_api_key_here
```

### Run

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` for Android / `i` for iOS simulator.

## Project Structure

```
App.tsx              # Root — navigation + PaperProvider
screens/
  HomeScreen.tsx     # Note list + record button
  NoteDetail.tsx     # Transcription and summary view
components/
  NoteList.tsx       # FlatList of note cards
  AudioPlayer.tsx    # Play/stop icon button
hooks/
  useRecorder.ts     # Recording logic (expo-av)
  usePlayer.ts       # Playback logic (expo-av)
db/
  notes.ts           # SQLite schema and queries
services/
  transcribe.ts      # Whisper + GPT API calls
```

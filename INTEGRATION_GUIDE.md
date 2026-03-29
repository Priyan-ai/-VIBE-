# Vibe Music Player - Integration Guide

## Overview
Vibe is a Spotify-inspired music player UI built with React and Tailwind CSS, optimized for Android devices with a mobile-first design.

## Features Implemented

### 📱 Pages
1. **Home** - Featured playlists, recently played tracks, and quick picks
2. **Search** - Search functionality with category browsing and trending music
3. **Library** - User's playlists and complete song collection
4. **Profile** - User profile with stats and settings
5. **Now Playing** - Full-screen player with controls and progress

### 🎵 Components
- **MiniPlayer** - Persistent mini player at the bottom with play/pause controls
- **BottomNav** - Mobile navigation bar
- **Player Controls** - Full playback controls (play, pause, next, previous, shuffle, repeat)

## File Structure

```
/src/app/
├── App.tsx                    # Main app component with state management
├── data/
│   └── musicData.ts          # Mock data (songs, playlists)
└── components/
    ├── HomePage.tsx
    ├── SearchPage.tsx
    ├── LibraryPage.tsx
    ├── ProfilePage.tsx
    ├── NowPlayingPage.tsx
    ├── MiniPlayer.tsx
    └── BottomNav.tsx
```

## Integration with Your Existing UI

### Option 1: Use as Standalone App
Simply use the current implementation as-is. The UI is complete and functional with mock data.

### Option 2: Integrate Components Individually

#### 1. **Replace Mock Data with Real Audio**
Edit `/src/app/data/musicData.ts`:

```typescript
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string; // Add your audio file URLs here
}
```

#### 2. **Connect to Your Backend**
In `App.tsx`, replace the mock data with API calls:

```typescript
import { useEffect, useState } from 'react';

// Fetch songs from your API
useEffect(() => {
  fetch('YOUR_API_ENDPOINT/songs')
    .then(res => res.json())
    .then(data => setSongs(data));
}, []);
```

#### 3. **Add Real Audio Playback**
Install an audio library (optional):
```bash
npm install howler
```

Then in `App.tsx`, add audio functionality:

```typescript
import { Howl } from 'howler';

const [sound, setSound] = useState<Howl | null>(null);

const handlePlaySong = (song: Song) => {
  // Stop current sound
  if (sound) {
    sound.stop();
  }

  // Create new sound
  const newSound = new Howl({
    src: [song.audioUrl],
    html5: true,
    onend: () => handleNext(),
  });

  newSound.play();
  setSound(newSound);
  setCurrentSong(song);
  setIsPlaying(true);
};

const handlePlayPause = () => {
  if (sound) {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  }
};
```

### Option 3: Merge with Existing Android App

#### For React Native Integration:
1. **Export Individual Components** - Each page component can be used independently
2. **Use Navigation Library** - Replace the tab state with React Navigation
3. **Connect to Native Audio** - Use `react-native-track-player` or similar

#### For WebView in Native Android:
1. Build the React app: `npm run build`
2. Host the build files
3. Load in Android WebView
4. Use JavaScript bridges to communicate between native and web

## Customization

### Change Brand Colors
Edit the gradient colors in components (currently purple/pink):
- Search for `purple` and `pink` in component files
- Replace with your brand colors

### Modify Layout
All components use Tailwind CSS classes. Edit spacing, sizing, and layout by modifying the className attributes.

### Add More Features
Consider adding:
- User authentication
- Playlist creation/editing
- Social features (sharing, following)
- Download for offline listening
- Lyrics display
- Equalizer
- Sleep timer

## State Management Tips

Current implementation uses React useState. For larger apps, consider:
- **Redux** - For complex state management
- **Zustand** - Lightweight alternative
- **React Context** - For simpler shared state

## API Integration Checklist

- [ ] Replace mock songs with API data
- [ ] Add authentication endpoints
- [ ] Implement playlist CRUD operations
- [ ] Add search API integration
- [ ] Connect user profile data
- [ ] Implement favorite/like functionality
- [ ] Add streaming/audio playback

## Performance Optimization

- Use `React.memo()` for components that don't need frequent re-renders
- Implement virtual scrolling for long lists
- Lazy load images
- Optimize audio streaming
- Add service workers for offline support

## Questions?

The UI is fully responsive and ready to use. Integrate your backend API and audio streaming to make it fully functional!

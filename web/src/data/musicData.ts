export interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  coverUrl: string
  audioUrl?: string
  lyrics?: string
  lyricsLanguage?: 'en' | 'ta'
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string
  songs: Song[]
}

export const songs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'The Vibes',
    album: 'Night Sessions',
    duration: '3:45',
    coverUrl:
      'https://images.unsplash.com/photo-1546528377-9049abbac32f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwaGlwJTIwaG9wJTIwbXVzaWN8ZW58MXx8fHwxNzczMTUwOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    lyrics: `I see the stars align in the midnight sky\nEvery shadow dances, asking me why\nWe're caught in the feeling, can't let it go\nA glowing horizon, a neon show\n\nOh, midnight dreams, calling your name\nNothing without you will ever be the same\nRiding the waves of this endless night\nHolding onto you till the morning light.`,
    lyricsLanguage: 'en',
  },
  {
    id: '2',
    title: 'Nenjukulle',
    artist: 'A.R. Rahman',
    album: 'Kadal',
    duration: '4:12',
    coverUrl:
      'https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGFydHxlbnwxfHx8fDE3NzMxNTA5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lyrics: `நெஞ்சுக்குள்ளே உம்மாருமும்\nகண்ணுக்குள்ளே உன் பிம்பமும்\nகாதல் என்னும் பெரும் காற்றில்\nகலந்து போகும் என் நெஞ்சம்\n\nநீ வரும் பாதையில் பூக்கள் பூக்கும்\nஉன் சிரிப்பினில் என் உலகம் சுழலும்\nகண்ணே என் கண்மணியே\nஎன் காதல் நீயே, என் உயிர் நீயே.`,
    lyricsLanguage: 'ta',
  },
  {
    id: '3',
    title: 'Rock Revolution',
    artist: 'Thunder Strike',
    album: 'Amplified',
    duration: '3:28',
    coverUrl:
      'https://images.unsplash.com/photo-1698769676386-7984304c8261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwbXVzaWMlMjBiYW5kfGVufDF8fHx8MTc3MzE1MDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    lyrics: `Guitar strings and broken dreams\nWe're tearing apart the seams\nRaise your voice into the night\nWe're ready for the fight!\n\nRevolution in our veins\nNothing here will stay the same\nFeel the bass, feel the fire\nTaking us higher and higher!`,
    lyricsLanguage: 'en',
  },
  {
    id: '4',
    title: 'Munbe Vaa',
    artist: 'Shreya Ghoshal',
    album: 'Sillunu Oru Kadhal',
    duration: '3:56',
    coverUrl:
      'https://images.unsplash.com/photo-1510809393-728d340e4eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBtdXNpYyUyMGNvbmNlcnR8ZW58MXx8fHwxNzczMDkzMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    lyrics: `முன்பே வா என் அன்பே வா\nஊனே வா உயிரே வா\nமுன்பே வா என் அன்பே வா\nபூப்பூவாய் பூப்போம் வா\n\nநான் நானா கேட்டேன் என்னை நானே\nநான் நீயா நெஞ்சம் சொன்னதே\nமுன்பே வா என் அன்பே வா\nஊனே வா உயிரே வா...`,
    lyricsLanguage: 'ta',
  },
  {
    id: '5',
    title: 'Smooth Jazz',
    artist: 'The Quartet',
    album: 'Blue Notes',
    duration: '5:23',
    coverUrl:
      'https://images.unsplash.com/photo-1710951403141-353d4e5c7cbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWNpYW4lMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzMxMTMyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Indie Vibes',
    artist: 'Acoustic Souls',
    album: 'Unplugged',
    duration: '4:05',
    coverUrl:
      'https://images.unsplash.com/photo-1512153129600-528cae82b06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljJTIwYXJ0aXN0fGVufDF8fHx8MTc3MzA0NjE3MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'Urban Beats',
    artist: 'Metro Flow',
    album: 'City Lights',
    duration: '3:33',
    coverUrl:
      'https://images.unsplash.com/photo-1546528377-9049abbac32f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwaGlwJTIwaG9wJTIwbXVzaWN8ZW58MXx8fHwxNzczMTUwOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: 'Neon Dreams',
    artist: 'Synthwave 84',
    album: 'Retro Future',
    duration: '4:48',
    coverUrl:
      'https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGFydHxlbnwxfHx8fDE3NzMxNTA5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

export const playlists: Playlist[] = [
  {
    id: 'p1',
    name: "Today's Top Hits",
    description: 'The hottest tracks right now',
    coverUrl:
      'https://images.unsplash.com/photo-1510809393-728d340e4eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBtdXNpYyUyMGNvbmNlcnR8ZW58MXx8fHwxNzczMDkzMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    songs: [songs[0], songs[3], songs[6]],
  },
  {
    id: 'p2',
    name: 'Electronic Vibes',
    description: 'Chill electronic beats',
    coverUrl:
      'https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGFydHxlbnwxfHx8fDE3NzMxNTA5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    songs: [songs[1], songs[7]],
  },
  {
    id: 'p3',
    name: 'Rock Classics',
    description: 'Timeless rock anthems',
    coverUrl:
      'https://images.unsplash.com/photo-1698769676386-7984304c8261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwbXVzaWMlMjBiYW5kfGVufDF8fHx8MTc3MzE1MDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    songs: [songs[2]],
  },
  {
    id: 'p4',
    name: 'Jazz Cafe',
    description: 'Smooth jazz for relaxing',
    coverUrl:
      'https://images.unsplash.com/photo-1710951403141-353d4e5c7cbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWNpYW4lMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzMxMTMyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    songs: [songs[4]],
  },
  {
    id: 'p5',
    name: 'Indie Acoustic',
    description: 'Raw and authentic sounds',
    coverUrl:
      'https://images.unsplash.com/photo-1512153129600-528cae82b06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljJTIwYXJ0aXN0fGVufDF8fHx8MTc3MzA0NjE3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    songs: [songs[5]],
  },
]

export const recentlyPlayed: Song[] = [songs[0], songs[1], songs[4], songs[5]]

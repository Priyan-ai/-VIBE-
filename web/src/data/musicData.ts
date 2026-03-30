export type Language = 'Tamil' | 'English' | 'Hindi' | 'Telugu' | 'Malayalam' | 'Kannada';

// Matches your Supabase songs table exactly
export interface Song {
  id: string;
  song_name: string;
  movie_name: string | null;
  music_director: string | null;
  cover_image_url: string;
  audio_url: string;
  duration: string | null;
  release_year: number | null;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  language: Language;
}

// Empty — songs are loaded from Supabase at runtime
export const songs: Song[] = [];
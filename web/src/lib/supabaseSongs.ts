import { Song } from '../data/musicData';
import { supabase } from './supabase';

const formatDuration = (durationValue: any) => {
  if (!durationValue) return '0:00';
  if (typeof durationValue === 'string') {
    if (durationValue.includes(':')) return durationValue;
    const parsed = parseInt(durationValue, 10);
    if (!isNaN(parsed)) return formatDuration(parsed);
    return '0:00';
  }
  if (typeof durationValue !== 'number' || Number.isNaN(durationValue)) return '0:00';
  
  const minutes = Math.floor(durationValue / 60);
  const seconds = Math.floor(durationValue % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

type SupabaseSongRow = {
  id: string | number;
  song_name: string | null;
  music_director: string | null;
  movie_name: string | null;
  duration: any;
  cover_image_url: string | null;
  audio_url: string | null;
};

const mapRowToSong = (row: SupabaseSongRow): Song => ({
  id: String(row.id),
  title: row.song_name || 'Untitled',
  artist: row.music_director || 'Unknown Artist',
  album: row.movie_name || 'Single',
  duration: formatDuration(row.duration),
  coverUrl: row.cover_image_url || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  audioUrl: row.audio_url || undefined,
});

export const fetchSupabaseSongs = async (): Promise<Song[]> => {
  const { data, error } = await supabase
    .from('songs')
    .select('id,song_name,music_director,movie_name,duration,cover_image_url,audio_url')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  return (data as SupabaseSongRow[]).map(mapRowToSong);
};

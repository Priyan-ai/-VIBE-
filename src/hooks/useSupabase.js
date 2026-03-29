import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AUDIO_BUCKET = import.meta.env.VITE_AUDIO_BUCKET || 'song-audio';
const COVER_BUCKET = import.meta.env.VITE_COVER_BUCKET || 'song-covers';

const safeFileName = (fileName) => fileName.replace(/[^a-zA-Z0-9._-]/g, '_');

export const useSupabase = () => {
  const getSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  };

  return {
    getSongs,
  };
};

export const useSongUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const uploadSong = async (audioFile, coverFile, formData) => {
    setUploading(true);
    setProgress(5);
    setError('');

    try {
      const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const audioPath = `${stamp}/audio-${safeFileName(audioFile.name)}`;
      const coverPath = `${stamp}/cover-${safeFileName(coverFile.name)}`;

      const { error: audioUploadError } = await supabase.storage
        .from(AUDIO_BUCKET)
        .upload(audioPath, audioFile, { upsert: false, contentType: audioFile.type || undefined });

      if (audioUploadError) throw audioUploadError;
      setProgress(45);

      const { error: coverUploadError } = await supabase.storage
        .from(COVER_BUCKET)
        .upload(coverPath, coverFile, { upsert: false, contentType: coverFile.type || undefined });

      if (coverUploadError) throw coverUploadError;
      setProgress(75);

      const { data: audioUrlData } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(audioPath);
      const { data: coverUrlData } = supabase.storage.from(COVER_BUCKET).getPublicUrl(coverPath);

      const payload = {
        song_name: formData.songName,
        movie_name: formData.movieName || null,
        music_director: formData.musicDirector || null,
        language: formData.language || 'Tamil',
        duration_seconds: Number(formData.duration) || null,
        release_year: Number(formData.releaseYear) || null,
        audio_url: audioUrlData.publicUrl,
        cover_image_url: coverUrlData.publicUrl,
      };

      const { data, error: insertError } = await supabase.from('songs').insert(payload).select().single();
      if (insertError) throw insertError;

      setProgress(100);
      return data;
    } catch (err) {
      const message = err?.message || 'Upload failed';
      setError(message);
      throw err;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  return {
    uploadSong,
    uploading,
    progress,
    error,
  };
};

export const useSearchSongs = (query, searchColumn = 'song_name') => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const trimmed = query?.trim() || '';

      if (!trimmed) {
        setResults([]);
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      const { data, error: searchError } = await supabase
        .from('songs')
        .select('*')
        .ilike(searchColumn, `%${trimmed}%`)
        .limit(30);

      if (cancelled) return;

      if (searchError) {
        setResults([]);
        setError(searchError.message || 'Search failed');
      } else {
        setResults(data || []);
      }

      setLoading(false);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [query, searchColumn]);

  return {
    results,
    loading,
    error,
  };
};
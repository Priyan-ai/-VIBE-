import { useState, useEffect, useRef } from 'react';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { LibraryPage } from './components/LibraryPage';
import { ProfilePage } from './components/ProfilePage';
import { NowPlayingPage } from './components/NowPlayingPage';
import { MiniPlayer } from './components/MiniPlayer';
import { BottomNav } from './components/BottomNav';
import { Song } from './data/musicData';
import { useAuth } from '../context/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { supabase } from '../lib/supabase';

const logoImage = '/src/assets/229c23a750655fa4a68de6cce10a3c01e214e592.png';

export default function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set());
  const [dataLoaded, setDataLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Songs fetched from Supabase
  const [songs, setSongs] = useState<Song[]>([]);
  const [songsLoading, setSongsLoading] = useState(true);
  const [songsError, setSongsError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Fetch songs from Supabase
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setSongsLoading(true);
        setSongsError(null);
        const { data, error } = await supabase
          .from('songs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSongs(data || []);
      } catch (err: any) {
        console.error('Failed to fetch songs:', err.message);
        setSongsError('Failed to load songs. Please try again.');
      } finally {
        setSongsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Load user liked/recent data from Supabase metadata
  useEffect(() => {
    if (user?.user_metadata) {
      if (user.user_metadata.recentSongIds && songs.length > 0) {
        const recentIds: string[] = user.user_metadata.recentSongIds;
        const recentFromDb = recentIds
          .map(id => songs.find(s => s.id === id))
          .filter(Boolean) as Song[];
        setRecentSongs(recentFromDb);
      }
      if (user.user_metadata.likedSongIds) {
        setLikedSongIds(new Set(user.user_metadata.likedSongIds));
      }
    }
    setDataLoaded(true);
  }, [user, songs]);

  // Sync liked/recent back to Supabase with debounce
  useEffect(() => {
    if (!dataLoaded || !user) return;
    const timer = setTimeout(async () => {
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            recentSongIds: recentSongs.map(s => s.id),
            likedSongIds: Array.from(likedSongIds),
          },
        });
        if (error) console.error('Supabase sync error:', error.message);
      } catch (err) {
        console.error('Failed to sync to Supabase:', err);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [recentSongs, likedSongIds, dataLoaded, user]);

  // Set favicon
  useEffect(() => {
    document.title = 'Vibe';
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = logoImage;
  }, []);

  // Audio engine
  useEffect(() => {
    if (!currentSong) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setProgress(0);
    setCurrentTime(0);

    const audio = new Audio(currentSong.audio_url);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', handleNext);

    if (isPlaying) audio.play().catch(console.error);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentSong]);

  // Play/pause toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlaySong = (song: Song) => {
    setProgress(0);
    setCurrentTime(0);
    setCurrentSong(song);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 20);
    });
  };

  const handlePlayPause = () => setIsPlaying(prev => !prev);

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setProgress(0);
    setCurrentTime(0);
    setCurrentSong(nextSong);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== nextSong.id);
      return [nextSong, ...filtered].slice(0, 20);
    });
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];
    setProgress(0);
    setCurrentTime(0);
    setCurrentSong(prevSong);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== prevSong.id);
      return [prevSong, ...filtered].slice(0, 20);
    });
  };

  const handleSeek = (value: number) => {
    setProgress(value);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
  };

  const handleToggleLike = (songId: string) => {
    setLikedSongIds(prev => {
      const updated = new Set(prev);
      updated.has(songId) ? updated.delete(songId) : updated.add(songId);
      return updated;
    });
  };

  const renderContent = () => {
    const likedSongs = songs.filter(s => likedSongIds.has(s.id));

    if (songsLoading) {
      return (
        <div className="flex items-center justify-center h-full min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading songs...</p>
          </div>
        </div>
      );
    }

    if (songsError) {
      return (
        <div className="flex items-center justify-center h-full min-h-screen">
          <div className="text-center px-6">
            <p className="text-red-400 mb-4">{songsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            songs={songs}
            onPlaySong={handlePlaySong}
            recentSongs={recentSongs}
          />
        );
      case 'search':
        return <SearchPage songs={songs} onPlaySong={handlePlaySong} />;
      case 'library':
        return (
          <LibraryPage
            onPlaySong={handlePlaySong}
            recentSongs={recentSongs}
            likedSongs={likedSongs}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            songCount={likedSongIds.size}
            recentCount={recentSongs.length}
          />
        );
      default:
        return <HomePage songs={songs} onPlaySong={handlePlaySong} recentSongs={recentSongs} />;
    }
  };

  if (loading) return <div className="size-full min-h-screen bg-black" />;
  if (!user) return <AuthScreen />;

  return (
    <div className="size-full bg-black text-white overflow-hidden">
      <div className="h-full overflow-y-auto pb-32">
        {renderContent()}
      </div>

      <MiniPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onOpenPlayer={() => setShowNowPlaying(true)}
      />

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {showNowPlaying && currentSong && (
        <NowPlayingPage
          song={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          likedSongIds={likedSongIds}
          onClose={() => setShowNowPlaying(false)}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSeek={handleSeek}
          onToggleLike={handleToggleLike}
        />
      )}
    </div>
  );
}
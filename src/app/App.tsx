import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { LibraryPage } from './components/LibraryPage';
import { ProfilePage } from './components/ProfilePage';
import { NowPlayingPage } from './components/NowPlayingPage';
import { MiniPlayer } from './components/MiniPlayer';
import { BottomNav } from './components/BottomNav';
import { Song, songs } from './data/musicData';
import { useAuth } from '../context/AuthContext';
import { AuthScreen } from './components/AuthScreen';
// ✅ Fixed: direct static import instead of broken dynamic import
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

  // Load user data from Supabase user_metadata on login
  useEffect(() => {
    if (user?.user_metadata) {
      if (user.user_metadata.recentSongs) {
        setRecentSongs(user.user_metadata.recentSongs);
      }
      if (user.user_metadata.likedSongIds) {
        setLikedSongIds(new Set(user.user_metadata.likedSongIds));
      }
    }
    setDataLoaded(true);
  }, [user]);

  // Sync recentSongs + likedSongIds back to Supabase with debounce
  useEffect(() => {
    if (!dataLoaded || !user || !supabase) return;

    const timer = setTimeout(async () => {
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            recentSongs,
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

  // Set favicon and title
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

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 20);
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== nextSong.id);
      return [nextSong, ...filtered].slice(0, 20);
    });
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];
    setCurrentSong(prevSong);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== prevSong.id);
      return [prevSong, ...filtered].slice(0, 20);
    });
  };

  const handleToggleLike = (songId: string) => {
    setLikedSongIds(prev => {
      const updated = new Set(prev);
      if (updated.has(songId)) {
        updated.delete(songId);
      } else {
        updated.add(songId);
      }
      return updated;
    });
  };

  const renderContent = () => {
    const likedSongs = songs.filter(s => likedSongIds.has(s.id));
    switch (activeTab) {
      case 'home':
        return <HomePage onPlaySong={handlePlaySong} />;
      case 'search':
        return <SearchPage onPlaySong={handlePlaySong} />;
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
        return <HomePage onPlaySong={handlePlaySong} />;
    }
  };

  if (loading) {
    return <div className="size-full min-h-screen bg-black" />;
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="size-full bg-black text-white overflow-hidden">
      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-32">
        {renderContent()}
      </div>

      {/* Mini Player */}
      <MiniPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onOpenPlayer={() => setShowNowPlaying(true)}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Now Playing Full Screen */}
      {showNowPlaying && currentSong && (
        <NowPlayingPage
          song={currentSong}
          isPlaying={isPlaying}
          onClose={() => setShowNowPlaying(false)}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
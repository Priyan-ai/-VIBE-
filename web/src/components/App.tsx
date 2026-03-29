import { useEffect, useState, useRef } from 'react'
import { HomePage } from './HomePage'
import { SearchPage } from './SearchPage'
import { LibraryPage } from './LibraryPage'
import { ProfilePage } from './ProfilePage'
import { NowPlayingPage } from './NowPlayingPage'
import { MiniPlayer } from './MiniPlayer'
import { BottomNav } from './BottomNav'
import { Song, songs } from '../data/musicData'
import { fetchSupabaseSongs } from '../lib/supabaseSongs'
import { useAuth } from '../../../src/context/AuthContext'
import { AuthScreen } from './AuthScreen'

export default function App() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('home')
  const [allSongs, setAllSongs] = useState<Song[]>(songs)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showNowPlaying, setShowNowPlaying] = useState(false)
  const [recentSongs, setRecentSongs] = useState<Song[]>([])
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set())
  const [libraryView, setLibraryView] = useState<string | null>(null)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (user?.user_metadata) {
      if (user.user_metadata.recentSongs) {
        setRecentSongs(user.user_metadata.recentSongs)
      }
      if (user.user_metadata.likedSongIds) {
        setLikedSongIds(new Set(user.user_metadata.likedSongIds))
      }
    }
    setDataLoaded(true)
  }, [user])

  useEffect(() => {
    if (!dataLoaded || !user) return
    const syncData = async () => {
      try {
        // @ts-ignore
        const { supabase } = await import('../../../src/lib/supabase')
        await supabase.auth.updateUser({
          data: {
            recentSongs,
            likedSongIds: Array.from(likedSongIds)
          }
        })
      } catch (err) {
        console.error('Failed to sync to Supabase', err)
      }
    }
    
    const timer = setTimeout(() => {
      syncData()
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [recentSongs, likedSongIds, dataLoaded, user])

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const remoteSongs = await fetchSupabaseSongs()
        if (remoteSongs.length > 0) {
          setAllSongs(remoteSongs)
        }
      } catch (error) {
        console.warn('Using local songs fallback:', error)
      }
    }

    loadSongs()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== song.id)
      return [song, ...filtered].slice(0, 20)
    })
  }

  const handleSeek = (value: number[]) => {
    const time = value[0]
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
  }

  const toggleLike = (songId: string) => {
    setLikedSongIds(prev => {
      const next = new Set(prev)
      if (next.has(songId)) next.delete(songId)
      else next.add(songId)
      return next
    })
  }

  const handlePlayPause = () => setIsPlaying((p) => !p)

  const handleNext = () => {
    if (!currentSong || allSongs.length === 0) return
    let nextSong: Song
    if (isShuffle) {
      const otherSongs = allSongs.filter(s => s.id !== currentSong.id)
      if (otherSongs.length > 0) {
        nextSong = otherSongs[Math.floor(Math.random() * otherSongs.length)]
      } else {
        nextSong = currentSong
      }
    } else {
      const idx = allSongs.findIndex((s) => s.id === currentSong.id)
      nextSong = allSongs[(idx + 1) % allSongs.length]
    }
    setCurrentSong(nextSong)
    setIsPlaying(true)
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== nextSong.id)
      return [nextSong, ...filtered].slice(0, 20)
    })
  }

  const handleSongEnd = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(console.error)
      }
    } else {
      handleNext()
    }
  }

  const handlePrevious = () => {
    if (!currentSong || allSongs.length === 0) return
    const idx = allSongs.findIndex((s) => s.id === currentSong.id)
    const prevSong = allSongs[idx === 0 ? allSongs.length - 1 : idx - 1]
    setCurrentSong(prevSong)
    setIsPlaying(true)
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== prevSong.id)
      return [prevSong, ...filtered].slice(0, 20)
    })
  }

  const handleNavigateFromProfile = (target: string) => {
    if (target === 'liked' || target === 'recent') {
      setLibraryView(target)
      setActiveTab('library')
    }
  }

  const renderContent = () => {
    const likedSongs = allSongs.filter(s => likedSongIds.has(s.id))
    switch (activeTab) {
      case 'home':    return <HomePage songs={allSongs} onPlaySong={handlePlaySong} recentSongs={recentSongs} />
      case 'search':  return <SearchPage songs={allSongs} onPlaySong={handlePlaySong} />
      case 'library': return <LibraryPage songs={allSongs} onPlaySong={handlePlaySong} recentSongs={recentSongs} likedSongs={likedSongs} libraryView={libraryView} setLibraryView={setLibraryView} />
      case 'profile': return <ProfilePage songCount={likedSongIds.size} recentCount={recentSongs.length} onNavigate={handleNavigateFromProfile} />
      default:        return <HomePage songs={allSongs} onPlaySong={handlePlaySong} recentSongs={recentSongs} />
    }
  }

  if (loading) {
    return <div className="w-full h-full min-h-screen bg-black" />
  }

  if (!user) {
    return <AuthScreen />
  }

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden relative flex flex-col">
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Mini Player (shown when song is selected, above bottom nav) */}
      <MiniPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onOpenPlayer={() => setShowNowPlaying(true)}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hidden Audio Player */}
      {currentSong?.audioUrl && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onEnded={handleSongEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration)
            if (isPlaying) e.currentTarget.play().catch(console.error)
          }}
        />
      )}

      {/* Full-Screen Now Playing */}
      {showNowPlaying && currentSong && (
        <NowPlayingPage
          song={currentSong}
          isPlaying={isPlaying}
          isLiked={likedSongIds.has(currentSong.id)}
          onLike={() => toggleLike(currentSong.id)}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onClose={() => setShowNowPlaying(false)}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          isShuffle={isShuffle}
          onToggleShuffle={() => setIsShuffle(!isShuffle)}
          isRepeat={isRepeat}
          onToggleRepeat={() => setIsRepeat(!isRepeat)}
        />
      )}
    </div>
  )
}

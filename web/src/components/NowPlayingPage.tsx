import { useState } from 'react'
import {
  ChevronDown,
  Heart,
  Shuffle,
  Rewind,
  Play,
  Pause,
  FastForward,
  Repeat,
  Volume2,
  MoreHorizontal,
} from 'lucide-react'
import { Song } from '../data/musicData'
import { Slider } from './ui/Slider'

interface NowPlayingPageProps {
  song: Song
  isPlaying: boolean
  onClose: () => void
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  currentTime: number
  duration: number
  volume: number
  onSeek: (value: number[]) => void
  onVolumeChange: (value: number[]) => void
  isLiked?: boolean
  onLike?: (songId: string) => void
  isShuffle?: boolean
  onToggleShuffle?: () => void
  isRepeat?: boolean
  onToggleRepeat?: () => void
}

const formatTime = (timeInSeconds: number) => {
  if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return '0:00'
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const parseDurationString = (durationStr: string | number | undefined | null): number => {
  if (!durationStr) return 0;
  if (typeof durationStr === 'number') return durationStr;
  const parts = String(durationStr).split(':');
  if (parts.length === 2) {
    const min = parseInt(parts[0], 10);
    const sec = parseInt(parts[1], 10);
    if (!isNaN(min) && !isNaN(sec)) {
      return min * 60 + sec;
    }
  }
  const parsed = parseInt(String(durationStr), 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function NowPlayingPage({
  song,
  isPlaying,
  onClose,
  onPlayPause,
  onPrevious,
  onNext,
  currentTime,
  duration,
  volume,
  onSeek,
  onVolumeChange,
  isLiked = false,
  onLike,
  isShuffle = false,
  onToggleShuffle,
  isRepeat = false,
  onToggleRepeat
}: NowPlayingPageProps) {
  const [internalLiked, setInternalLiked] = useState(false)
  const isCurrentlyLiked = onLike ? isLiked : internalLiked

  const toggleLike = () => {
    if (onLike) {
      onLike(song.id)
    } else {
      setInternalLiked(!internalLiked)
    }
  }

  // Use either the actual loaded duration or the database duration as fallback
  const displayDuration = (duration > 0 && isFinite(duration) && !isNaN(duration))
    ? duration 
    : parseDurationString(song.duration)

  return (
    <div className="fixed inset-0 bg-[#050B14] z-50 overflow-auto">
      {/* Creative Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>

      {/* ── Retro Radio Background ── */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-1000 ease-out flex items-center justify-center z-0 ${
          isPlaying ? 'opacity-30 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="w-[120vw] h-[100vh] sm:w-[100vw] sm:h-[100vh] max-w-4xl max-h-[900px] border-8 border-teal-500/20 rounded-[4rem] bg-[#0c1218]/80 flex flex-col relative overflow-hidden shadow-[0_0_100px_rgba(20,184,166,0.2)]">
          {/* Handle / Top Detail */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-gradient-to-b from-[#121c26] to-[#0c1218] rounded-b-3xl border-b-2 border-x-2 border-teal-500/20" />
          {/* Antenna */}
          <div className="absolute top-0 left-[10%] w-3 h-48 bg-gradient-to-t from-gray-600 to-gray-300 rounded-t-full -translate-y-24 rotate-[20deg] origin-bottom" />
          {/* Controls row */}
          <div className="flex justify-between px-16 pt-24">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-md border-2 border-white/10" />
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-4 rounded-full bg-gray-800 border-2 border-white/5 mt-4" />
              <div className="w-16 h-4 rounded-full bg-gray-800 border-2 border-white/5 mt-4" />
            </div>
          </div>
          {/* Cassette Deck */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-64 bg-black/60 rounded-3xl border-4 border-gray-800 flex items-center justify-center gap-16 px-8 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-3xl pointer-events-none z-10" />
            {/* Left Reel */}
            <div className={`relative w-32 h-32 rounded-full bg-gray-900 border-4 border-teal-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)] ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-8 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-teal-500/40" />
                <div className="w-1 h-full bg-teal-500/40 absolute" />
                <div className="w-full h-1 bg-teal-500/40 rotate-45 absolute" />
                <div className="w-full h-1 bg-teal-500/40 -rotate-45 absolute" />
              </div>
            </div>
            {/* Right Reel */}
            <div className={`relative w-32 h-32 rounded-full bg-gray-900 border-4 border-teal-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)] ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-8 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-teal-500/40" />
                <div className="w-1 h-full bg-teal-500/40 absolute" />
                <div className="w-full h-1 bg-teal-500/40 rotate-45 absolute" />
                <div className="w-full h-1 bg-teal-500/40 -rotate-45 absolute" />
              </div>
            </div>
            {/* Tape bridge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-12 border-t-4 border-gray-700/80 rounded-[50%] opacity-50" />
          </div>
          {/* Left Speaker */}
          <div className="absolute bottom-20 left-8 w-[25%] h-80 rounded-2xl border-2 border-white/5 bg-gradient-to-br from-gray-900 to-black p-4 flex flex-col gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`l-${i}`} className="w-full h-3 bg-gray-800 rounded-full shadow-inner opacity-60" />
            ))}
          </div>
          {/* Right Speaker */}
          <div className="absolute bottom-20 right-8 w-[25%] h-80 rounded-2xl border-2 border-white/5 bg-gradient-to-br from-gray-900 to-black p-4 flex flex-col gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`r-${i}`} className="w-full h-3 bg-gray-800 rounded-full shadow-inner opacity-60" />
            ))}
          </div>
          {/* EQ Visualizer */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[40%] h-32 flex items-end justify-center gap-3 opacity-80">
            {[1,2,3,4,5,6,7,8].map((n) => (
              <div
                key={n}
                className={`w-6 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-md ${isPlaying ? `eq-bar-${n}` : 'h-[10%]'}`}
                style={{ height: isPlaying ? undefined : '10%' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="min-h-full flex flex-col px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="text-white hover:scale-110 transition-transform">
            <ChevronDown className="w-8 h-8" />
          </button>
          <div className="text-center flex-1">
            <p className="text-gray-400 text-sm">PLAYING FROM PLAYLIST</p>
            <p className="text-white font-medium">Today's Top Hits</p>
          </div>
          <button className="text-white hover:scale-110 transition-transform">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center mb-8 relative z-10">
          <div className={`relative w-64 h-64 sm:w-80 sm:h-80 transition-all duration-700 ease-out ${isPlaying ? 'scale-100' : 'scale-105'}`}>
            <div className={`absolute -inset-2 bg-gradient-to-tr from-teal-500 via-blue-500 to-emerald-500 rounded-3xl blur-2xl transition-opacity duration-700 ${isPlaying ? 'opacity-40 animate-pulse' : 'opacity-0'} -z-10`} />
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-full h-full object-cover rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 pr-4">
              <h1 className="text-white text-2xl font-medium mb-2 truncate">{song.title}</h1>
              <p className="text-gray-400">{song.artist}</p>
            </div>
            <button
              className={`flex-shrink-0 hover:scale-110 transition-transform ${isCurrentlyLiked ? 'text-teal-400' : 'text-gray-400'}`}
              onClick={toggleLike}
            >
              <Heart className={`w-7 h-7 ${isCurrentlyLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider 
            value={[currentTime]} 
            max={displayDuration || 100} 
            step={1} 
            className="w-full" 
            onValueChange={onSeek}
          />
          <div className="flex justify-between text-gray-400 text-xs mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{typeof song.duration === 'string' && song.duration.includes(':') && !duration ? song.duration : formatTime(displayDuration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 px-2">
          <button 
            onClick={onToggleShuffle} 
            className={`${isShuffle ? 'text-teal-400' : 'text-white/60'} hover:text-white transition-colors relative`}
          >
            <Shuffle className="w-6 h-6" />
            {isShuffle && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full" />}
          </button>
          <button onClick={onPrevious} className="text-white hover:opacity-80 transition-opacity active:scale-95">
            <Rewind className="w-10 h-10 fill-current" />
          </button>
          <button
            onClick={onPlayPause}
            className="bg-white text-black rounded-full w-[72px] h-[72px] flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current translate-x-[2px]" />
            )}
          </button>
          <button onClick={onNext} className="text-white hover:opacity-80 transition-opacity active:scale-95">
            <FastForward className="w-10 h-10 fill-current" />
          </button>
          <button 
            onClick={onToggleRepeat} 
            className={`${isRepeat ? 'text-teal-400' : 'text-white/60'} hover:text-white transition-colors relative`}
          >
            <Repeat className="w-6 h-6" />
            {isRepeat && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full" />}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mb-8">
          <Volume2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <Slider 
            value={[volume * 100]} 
            max={100} 
            step={1} 
            className="flex-1" 
            onValueChange={onVolumeChange}
          />
        </div>

        {/* Lyrics Box */}
        {song.lyrics && (
          <div className="w-full bg-gradient-to-br from-teal-900/40 to-blue-900/40 rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-xl mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-lg">Lyrics</h2>
              <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/70 font-medium uppercase">
                {song.lyricsLanguage === 'ta' ? 'Tamil' : 'English'}
              </span>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
              {song.lyrics.split('\n\n').map((stanza, idx) => (
                <p
                  key={idx}
                  className={`text-2xl leading-relaxed font-semibold ${idx === 0 ? 'text-white' : 'text-white/50'}`}
                >
                  {stanza.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

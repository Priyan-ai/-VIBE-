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
} from 'lucide-react';
import { Song } from '../data/musicData';
import { Slider } from './ui/slider';

interface NowPlayingPageProps {
  song: Song;
  isPlaying: boolean;
  onClose: () => void;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function NowPlayingPage({
  song,
  isPlaying,
  onClose,
  onPlayPause,
  onPrevious,
  onNext,
}: NowPlayingPageProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 via-black to-black z-50 overflow-auto">
      {/* Retro Radio Background spanning the overall box */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-all duration-1000 ease-out flex items-center justify-center z-0 ${
          isPlaying 
            ? 'opacity-30 scale-100' 
            : 'opacity-0 scale-90'
        }`}
      >
        <div className="w-[120vw] h-[100vh] sm:w-[100vw] sm:h-[100vh] max-w-4xl max-h-[900px] border-8 border-purple-500/20 rounded-[4rem] bg-[#1a1525]/80 flex flex-col relative overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.2)]">
          
          {/* Handle / Top Detail */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-gradient-to-b from-[#2a2238] to-[#1a1525] rounded-b-3xl border-b-2 border-x-2 border-purple-500/20"></div>

          {/* Antenna */}
          <div className="absolute top-0 left-[10%] w-3 h-48 bg-gradient-to-t from-gray-600 to-gray-300 rounded-t-full -translate-y-24 rotate-[20deg] origin-bottom"></div>

          {/* Controls - Top Left/Right */}
          <div className="flex justify-between px-16 pt-24">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.5)]"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-md border-2 border-white/10"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-4 rounded-full bg-gray-800 border-2 border-white/5 mt-4"></div>
              <div className="w-16 h-4 rounded-full bg-gray-800 border-2 border-white/5 mt-4"></div>
            </div>
          </div>

          {/* Cassette Deck - Giant, behind the main content */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-64 bg-black/60 rounded-3xl border-4 border-gray-800 flex items-center justify-center gap-16 px-8 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-0 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none">
            
            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-3xl pointer-events-none z-10"></div>
            
            {/* Left Tape Reel */}
            <div className={`relative w-32 h-32 rounded-full bg-gray-900 border-4 border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
              <div className="w-8 h-8 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] z-10"></div>
              {/* Tape spokes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-purple-500/40"></div>
                <div className="w-1 h-full bg-purple-500/40 absolute"></div>
                <div className="w-full h-1 bg-purple-500/40 rotate-45 absolute"></div>
                <div className="w-full h-1 bg-purple-500/40 -rotate-45 absolute"></div>
              </div>
            </div>
            
            {/* Right Tape Reel */}
            <div className={`relative w-32 h-32 rounded-full bg-gray-900 border-4 border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
              <div className="w-8 h-8 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] z-10"></div>
              {/* Tape spokes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-purple-500/40"></div>
                <div className="w-1 h-full bg-purple-500/40 absolute"></div>
                <div className="w-full h-1 bg-purple-500/40 rotate-45 absolute"></div>
                <div className="w-full h-1 bg-purple-500/40 -rotate-45 absolute"></div>
              </div>
            </div>

            {/* Tape connecting bridge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-12 border-t-4 border-gray-700/80 rounded-[50%] opacity-50"></div>
          </div>

          {/* Giant Speakers - Left and Right Bottom */}
          <div className="absolute bottom-20 left-8 w-[25%] h-80 rounded-2xl border-2 border-white/5 bg-gradient-to-br from-gray-900 to-black p-4 flex flex-col gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={`l-${i}`} className="w-full h-3 bg-gray-800 rounded-full shadow-inner opacity-60"></div>
            ))}
          </div>
          
          <div className="absolute bottom-20 right-8 w-[25%] h-80 rounded-2xl border-2 border-white/5 bg-gradient-to-br from-gray-900 to-black p-4 flex flex-col gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={`r-${i}`} className="w-full h-3 bg-gray-800 rounded-full shadow-inner opacity-60"></div>
            ))}
          </div>

          {/* EQ Visualizer (Decorative, between speakers) */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[40%] h-32 flex items-end justify-center gap-3 opacity-80">
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[60%] ${isPlaying ? 'animate-[bounce_0.8s_infinite]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[80%] ${isPlaying ? 'animate-[bounce_0.6s_infinite_0.1s]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[40%] ${isPlaying ? 'animate-[bounce_0.9s_infinite_0.2s]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[90%] ${isPlaying ? 'animate-[bounce_0.7s_infinite_0.3s]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[50%] ${isPlaying ? 'animate-[bounce_0.8s_infinite_0.4s]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[70%] ${isPlaying ? 'animate-[bounce_0.6s_infinite_0.5s]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[30%] ${isPlaying ? 'animate-[bounce_0.9s_infinite_0.6s]' : ''}`}></div>
            <div className={`w-6 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md h-[85%] ${isPlaying ? 'animate-[bounce_0.7s_infinite_0.7s]' : ''}`}></div>
          </div>
        </div>
      </div>

      <div className="min-h-full flex flex-col px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="text-white">
            <ChevronDown className="size-8" />
          </button>
          <div className="text-center flex-1">
            <p className="text-gray-400 text-sm">PLAYING FROM PLAYLIST</p>
            <p className="text-white">Today's Top Hits</p>
          </div>
          <button className="text-white">
            <MoreHorizontal className="size-6" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center mb-8 relative z-10">
          <div className={`relative w-64 h-64 sm:w-80 sm:h-80 transition-all duration-700 ease-out ${
            isPlaying 
              ? 'scale-100' 
              : 'scale-105'
          }`}>
            {/* Glowing shadow for playing state */}
            <div className={`absolute -inset-2 bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-600 rounded-3xl blur-2xl transition-opacity duration-700 ${
              isPlaying ? 'opacity-40 animate-pulse' : 'opacity-0'
            } -z-10`}></div>
            
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
            <div className="flex-1">
              <h1 className="text-white text-2xl mb-2">{song.title}</h1>
              <p className="text-gray-400">{song.artist}</p>
            </div>
            <button className="text-purple-400 hover:scale-110 transition">
              <Heart className="size-7" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            defaultValue={[45]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-gray-400 text-xs mt-2">
            <span>1:32</span>
            <span>{song.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 px-2">
          <button className="text-white/60 hover:text-white transition">        
            <Shuffle className="size-6" />
          </button>
          <button
            onClick={onPrevious}
            className="text-white hover:opacity-80 transition active:scale-95"
          >
            <Rewind className="size-10 fill-current" />
          </button>
          <button
            onClick={onPlayPause}
            className="bg-white text-black rounded-full w-[72px] h-[72px] flex items-center justify-center hover:scale-105 transition active:scale-95 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="size-8 fill-current" />
            ) : (
              <Play className="size-8 fill-current translate-x-[2px]" />
            )}
          </button>
          <button
            onClick={onNext}
            className="text-white hover:opacity-80 transition active:scale-95"
          >
            <FastForward className="size-10 fill-current" />
          </button>
          <button className="text-white/60 hover:text-white transition">        
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mb-8">
          <Volume2 className="size-5 text-gray-400" />
          <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
        </div>

        {/* Lyrics Box */}
        {song.lyrics && (
          <div className="w-full bg-gradient-to-br from-purple-800/40 to-pink-900/40 rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-xl mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-lg">Lyrics</h2>
              <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/70 font-medium uppercase">
                {song.lyricsLanguage === 'ta' ? 'Tamil' : 'English'}
              </span>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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
  );
}

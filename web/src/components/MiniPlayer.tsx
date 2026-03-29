import { Play, Pause, FastForward, Rewind } from 'lucide-react'
import { Song } from '../data/musicData'

interface MiniPlayerProps {
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onOpenPlayer: () => void
}

export function MiniPlayer({ 
  currentSong, 
  isPlaying, 
  currentTime,
  duration,
  onPlayPause, 
  onNext, 
  onPrevious,
  onOpenPlayer 
}: MiniPlayerProps) {
  if (!currentSong) return null

  // Calculate progress percentage, avoiding NaN/Infinity
  const progressPercent = (duration > 0 && isFinite(duration) && !isNaN(duration)) 
    ? (currentTime / duration) * 100 
    : 0;

  return (
    <div 
      className="fixed bottom-[64px] pb-safe left-0 right-0 z-40 cursor-pointer group bg-[#0a1018]/90 hover:bg-[#0c141e]/95 border-t border-white/10 px-4 py-2 backdrop-blur-2xl overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.5)] transition-all duration-300"
      onClick={onOpenPlayer}
    >
      {/* Animated background glowing orbs inside */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-48 bg-teal-500/20 rounded-full blur-[32px] mix-blend-screen opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/20 rounded-full blur-[32px] mix-blend-screen opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50"></div>
      </div>

      {/* Progress bar at the VERY top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(20,184,166,0.8)] transition-all duration-200 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full relative z-10 pt-1">
        {/* Rotating vinyl record effect for album art */}
        <div className="relative flex-shrink-0 w-11 h-11 ml-1">
           <div className={`w-full h-full rounded-full overflow-hidden border-2 border-black/80 shadow-lg ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
             <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Vinyl center hole and rings */}
                <div className="w-3 h-3 bg-black/90 border border-gray-800 rounded-full flex items-center justify-center shadow-inner">
                  <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                </div>
                <div className="absolute w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full border border-white/5 pointer-events-none"></div>
              </div>
           </div>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <p className="text-white text-sm font-semibold truncate tracking-tight group-hover:text-teal-300 transition-colors drop-shadow-md">{currentSong.title}</p>
          <p className="text-teal-100/60 text-xs truncate font-medium mt-0.5">{currentSong.artist}</p>
        </div>

        <div className="flex items-center gap-1 mr-2">
          <button
            onClick={(e) => { e.stopPropagation(); onPrevious() }}
            className="w-10 h-10 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors active:scale-95"
          >
            <Rewind className="w-6 h-6 fill-current" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPlayPause() }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform active:scale-95 shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-[1px]" />
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="w-10 h-10 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors active:scale-95"
          >
            <FastForward className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
  )
}

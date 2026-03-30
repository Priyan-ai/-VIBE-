import { Play, Pause, FastForward, Rewind } from 'lucide-react';
import { Song } from '../data/musicData';

interface MiniPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number; // 0–100
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onOpenPlayer: () => void;
}

export function MiniPlayer({
  currentSong,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrevious,
  onOpenPlayer,
}: MiniPlayerProps) {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 z-40">
      <div className="flex items-center gap-3">
        <img
          src={currentSong.cover_image_url}
          alt={currentSong.song_name}
          className="size-12 rounded-lg object-cover cursor-pointer"
          onClick={onOpenPlayer}
        />
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onOpenPlayer}>
          <p className="text-white truncate font-medium">{currentSong.song_name}</p>
          <p className="text-gray-300 text-sm truncate">
            {currentSong.music_director ?? currentSong.movie_name ?? ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onPrevious(); }}
            className="p-2 text-white hover:scale-105 transition"
          >
            <Rewind className="size-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
            className="p-2 rounded-full bg-white text-black hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="p-2 text-white hover:scale-105 transition"
          >
            <FastForward className="size-5" />
          </button>
        </div>
      </div>
      {/* Real progress bar */}
      <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
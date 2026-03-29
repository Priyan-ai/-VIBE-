import { Clock, Play } from 'lucide-react';
import { Playlist, Song, playlists, recentlyPlayed } from '../data/musicData';
import logoImage from '../../assets/229c23a750655fa4a68de6cce10a3c01e214e592.png';

interface HomePageProps {
  onPlaySong: (song: Song) => void;
}

export function HomePage({ onPlaySong }: HomePageProps) {
  return (
    <div className="pb-32 px-4 pt-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <img 
            src={logoImage} 
            alt="Vibe" 
            className="w-28 h-auto invert hue-rotate-180 contrast-125 mix-blend-screen drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          />
        </div>
        <p className="text-gray-400">Good evening</p>
      </div>

      {/* Recently Played */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="size-5 text-purple-400" />
          <h2 className="text-xl text-white">Recently Played</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recentlyPlayed.map((song) => (
            <button
              key={song.id}
              onClick={() => onPlaySong(song)}
              className="flex items-center gap-3 bg-white/5 rounded-lg p-2 hover:bg-white/10 transition group"
            >
              <img
                src={song.coverUrl}
                alt={song.title}
                className="size-14 rounded object-cover"
              />
              <div className="flex-1 text-left min-w-0">
                <p className="text-white text-sm truncate">{song.title}</p>
                <p className="text-gray-400 text-xs truncate">{song.artist}</p>
              </div>
              <Play className="size-5 text-purple-400 opacity-0 group-hover:opacity-100 transition fill-current" />
            </button>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-xl text-white mb-4">Made For You</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex-shrink-0 w-40 cursor-pointer group"
              onClick={() => playlist.songs[0] && onPlaySong(playlist.songs[0])}
            >
              <div className="relative mb-3">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-purple-500 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0">
                  <Play className="size-5 text-white fill-current" />
                </button>
              </div>
              <h3 className="text-white text-sm mb-1 truncate">{playlist.name}</h3>
              <p className="text-gray-400 text-xs truncate">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Picks */}
      <section className="mt-8">
        <h2 className="text-xl text-white mb-4">Quick Picks</h2>
        <div className="space-y-2">
          {playlists.slice(0, 3).map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-4 bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg p-3 hover:from-purple-900/30 transition cursor-pointer"
              onClick={() => playlist.songs[0] && onPlaySong(playlist.songs[0])}
            >
              <img
                src={playlist.coverUrl}
                alt={playlist.name}
                className="size-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-white mb-1">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">{playlist.songs.length} songs</p>
              </div>
              <Play className="size-6 text-purple-400 fill-current" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

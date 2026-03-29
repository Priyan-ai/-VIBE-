import { useState } from 'react'
import { Clock, Play, Disc3, ChevronLeft, Calendar, Music } from 'lucide-react'
import { Song } from '../data/musicData'
import { VibeLogo } from './VibeLogo'

interface HomePageProps {
  songs: Song[]
  onPlaySong: (song: Song) => void
  recentSongs?: Song[]
}

export function HomePage({ songs, onPlaySong, recentSongs = [] }: HomePageProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)

  const displayRecent = recentSongs.length > 0 ? recentSongs.slice(0, 4) : songs.slice(0, 4)

  // Group songs by album
  const groupedByAlbum = songs.reduce((acc, song) => {
    const albumName = song.album || 'Unknown Album'
    if (!acc[albumName]) {
      acc[albumName] = [];
    }
    acc[albumName].push(song);
    return acc;
  }, {} as Record<string, typeof songs>);

  const sortedAlbums = Object.entries(groupedByAlbum).sort(([albumA], [albumB]) =>
    albumA.localeCompare(albumB)
  );

  // Take a generous selection of top albums for the homepage
  const displayAlbums = sortedAlbums;

  const activeAlbumSongs = selectedAlbum ? groupedByAlbum[selectedAlbum] : null;

  return (
    <div className="pb-32 px-4 pt-6 overflow-y-auto h-full relative bg-[#0a0f12]">
      {/* Creative Background Patterns */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-10%] w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] left-[-15%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>

      <div className="relative z-10">
        {activeAlbumSongs ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setSelectedAlbum(null)}
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-6 group bg-white/5 px-4 py-2 rounded-full w-fit hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
              <div className="w-full md:w-48 lg:w-56 flex-shrink-0 relative group">
                <img 
                  src={activeAlbumSongs[0].coverUrl} 
                  alt={selectedAlbum!} 
                  className="w-48 h-48 md:w-full md:h-auto aspect-square object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] mx-auto md:mx-0 group-hover:scale-[1.02] transition-transform duration-300"
                />
                <button
                  onClick={() => onPlaySong(activeAlbumSongs[0])}
                  className="absolute bottom-4 right-4 md:right-auto md:left-4 lg:right-4 lg:left-auto bg-teal-500 hover:bg-teal-400 p-4 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:scale-105"
                >
                  <Play className="w-6 h-6 text-white fill-current ml-1" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left pt-2 md:pt-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">{selectedAlbum}</h1>
                <p className="text-gray-300 text-lg font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                  <span className="text-teal-400">{activeAlbumSongs[0].artist}</span>
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full"><Music className="w-4 h-4" /> {activeAlbumSongs.length} tracks</span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /> 2024</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 bg-white/[0.02] p-2 rounded-2xl border border-white/5 shadow-xl">
              {activeAlbumSongs.map((song, index) => (
                <button
                  key={`song-${song.id}-${index}`}
                  onClick={() => onPlaySong(song)}
                  className="w-full flex items-center gap-4 bg-transparent hover:bg-white/[0.06] p-3 rounded-xl transition-all group text-left relative overflow-hidden"
                >
                  <span className="w-6 text-center text-gray-500 font-medium group-hover:text-teal-400 transition-colors shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-base font-medium truncate group-hover:text-teal-300 transition-colors drop-shadow-sm">{song.title}</p>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </div>
                  <span className="text-gray-500 text-sm flex-shrink-0 group-hover:text-gray-300 transition-colors">{song.duration}</span>
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shrink-0">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 pl-1 pt-2">
              <VibeLogo className="w-24 h-auto" />
              <h1 className="text-3xl text-white font-bold tracking-tight">Good evening</h1>
            </div>

            {/* Recently Played */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4 pl-1">
                <Clock className="w-6 h-6 text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                <h2 className="text-2xl text-white font-bold tracking-tight">Recently Played</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {displayRecent.map((song, i) => (
                  <button
                    key={`recent-${song.id}-${i}`}
                    onClick={() => onPlaySong(song)}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-2.5 hover:bg-white/[0.08] hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300 group text-left shadow-lg shadow-black/20"
                  >
                    <div className="relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white fill-current drop-shadow-md" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-white text-sm font-semibold truncate group-hover:text-teal-300 transition-colors">{song.title}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-gray-400/80 text-xs font-medium truncate">{song.artist}</p>
                        <span className="text-gray-500 text-xs flex-shrink-0 group-hover:text-gray-300 transition-colors ml-2">{song.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Albums Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4 pl-1">
                <Disc3 className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <h2 className="text-2xl text-white font-bold tracking-tight">Featured Albums</h2>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-6 pt-2 px-1 scrollbar-hide -mx-1">
                {displayAlbums.map(([albumName, albumSongs]) => (
                  <div
                    key={`album-${albumName}`}
                    className="flex-shrink-0 w-44 cursor-pointer group bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-1"
                    onClick={() => setSelectedAlbum(albumName)}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-xl shadow-md">
                      <img
                        src={albumSongs[0].coverUrl}
                        alt={albumName}
                        className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-white text-base font-bold mb-1 truncate group-hover:text-teal-300 transition-colors drop-shadow-sm">{albumName}</h3>
                    <p className="text-gray-400 text-xs font-medium truncate flex items-center justify-between">
                      <span>{albumSongs[0].artist}</span>
                      <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] ml-1 shrink-0">{albumSongs.length} {albumSongs.length === 1 ? 'Song' : 'Songs'}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

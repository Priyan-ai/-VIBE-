import { Search, Play } from 'lucide-react'
import { useState } from 'react'
import { Song } from '../data/musicData'

interface SearchPageProps {
  songs: Song[]
  onPlaySong: (song: Song) => void
}

export function SearchPage({ songs, onPlaySong }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pb-32 px-4 pt-6 overflow-y-auto h-full relative bg-[#0a0a0a]">
      {/* Creative Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient meshes */}
        <div className="absolute top-[-15%] left-[-10%] w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[120px] mix-blend-screen mix-blend-screen"></div>
        <div className="absolute top-[30%] right-[-20%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl text-white font-bold mb-8 tracking-tight drop-shadow-md">Search</h1>

        {/* Search Bar */}
        <div className="relative mb-8 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-teal-400 transition-colors duration-300" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl pl-14 pr-4 py-4 outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/30 backdrop-blur-xl transition-all shadow-xl shadow-black/20"
          />
        </div>

        {searchQuery ? (
          <div className="transition-all duration-300">
            <h2 className="text-xl text-white/90 font-semibold mb-4 flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-400 px-2.5 py-0.5 rounded-md text-sm border border-teal-500/20 shadow-sm">{filteredSongs.length}</span>
              results found
            </h2>
            <div className="space-y-2">
              {filteredSongs.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm mt-4">
                  <Search className="w-12 h-12 text-gray-500/50 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">No songs found for "<span className="text-white font-medium">{searchQuery}</span>"</p>
                  <p className="text-gray-500 text-sm mt-2">Try searching for a different artist, song, or album</p>
                </div>
              ) : (
                filteredSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => onPlaySong(song)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group text-left border border-transparent hover:border-white/5"
                  >
                    <div className="relative overflow-hidden rounded-lg flex-shrink-0 shadow-md">
                      <img src={song.coverUrl} alt={song.title} className="w-14 h-14 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <Play className="w-5 h-5 text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate group-hover:text-teal-300 transition-colors">{song.title}</p>
                      <p className="text-gray-400 text-sm truncate mt-0.5">
                        {song.artist} <span className="mx-1.5 text-gray-600/80">•</span> {song.album}
                      </p>
                    </div>
                    <span className="text-gray-500 text-sm flex-shrink-0 group-hover:text-gray-300 transition-colors">{song.duration}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="transition-all duration-500">
            {/* Trending Now */}
            <section className="mt-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white font-bold tracking-tight">Trending Now</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6">
                {songs.slice(0, 6).map((song) => (
                  <div
                    key={song.id}
                    className="cursor-pointer group bg-white/[0.02] hover:bg-white/[0.06] p-3 rounded-xl border border-white/[0.02] hover:border-white/10 transition-all duration-300"
                    onClick={() => onPlaySong(song)}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-lg shadow-lg shadow-black/40 aspect-square">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl ml-auto">
                          <Play className="w-5 h-5 text-white fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 text-[15px] font-semibold truncate group-hover:text-teal-300 transition-colors">{song.title}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-gray-400/80 text-xs truncate font-medium">{song.artist}</p>
                      <span className="text-gray-500/80 text-xs flex-shrink-0 group-hover:text-gray-300 transition-colors ml-2">{song.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState, useRef, useLayoutEffect } from 'react'
import { Music, ListMusic, Heart, Clock, ArrowLeft, Search } from 'lucide-react'
import { playlists, Song, recentlyPlayed } from '../data/musicData'

interface LibraryPageProps {
  songs: Song[]
  onPlaySong: (song: Song) => void
  recentSongs?: Song[]
  likedSongs?: Song[]
  libraryView?: string | null
  setLibraryView?: (view: string | null) => void
}

export function LibraryPage({ songs, onPlaySong, recentSongs = [], likedSongs = [], libraryView = null, setLibraryView }: LibraryPageProps) {
  const [activeViewLocal, setActiveViewLocal] = useState<string | null>(null)
  
  const activeView = libraryView !== undefined ? libraryView : activeViewLocal
  const setActiveView = setLibraryView || setActiveViewLocal

  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [albumSearchQuery, setAlbumSearchQuery] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useState(0)

  useLayoutEffect(() => {
    if (activeView === 'albums' && !selectedAlbum && scrollRef.current) {
      scrollRef.current.scrollTop = scrollPos
    }
  }, [activeView, selectedAlbum, scrollPos])

  const dynamicPlaylists = [
    { id: 'p1', name: 'Favorites', songs: [songs[0]].filter(Boolean), coverUrl: songs[0]?.coverUrl || playlists[0].coverUrl },
    { id: 'p2', name: 'Workout Mix', songs: [songs[1]].filter(Boolean), coverUrl: songs[1]?.coverUrl || playlists[1].coverUrl },
  ]

  const groupedByAlbum = songs.reduce((acc, song) => {
    if (!acc[song.album]) {
      acc[song.album] = [];
    }
    acc[song.album].push(song);
    return acc;
  }, {} as Record<string, typeof songs>);

  const sortedAlbums = Object.entries(groupedByAlbum).sort(([albumA], [albumB]) => 
    albumA.localeCompare(albumB)
  );

  const filteredAlbums = sortedAlbums.filter(([albumName]) => 
    albumName.toLowerCase().includes(albumSearchQuery.toLowerCase())
  );

  const libraryItems = [
    { id: 'liked', icon: Heart, label: 'Liked Songs', count: likedSongs.length, color: 'text-rose-400' },
    { id: 'albums', icon: Music, label: 'Albums', count: sortedAlbums.length, color: 'text-emerald-400' },
    { id: 'recent', icon: Clock, label: 'Recently Played', count: recentSongs.length, color: 'text-amber-400' },
  ]

  const renderContent = () => {
    if (activeView === 'liked') {
      return (
        <div className="w-full">
          <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Library
          </button>
          <h1 className="text-4xl text-white font-bold mb-8 tracking-tight drop-shadow-md">Liked Songs</h1>
          <div className="space-y-2">
            {likedSongs.length > 0 ? likedSongs.map((song) => (
              <button
                key={`liked-${song.id}`}
                onClick={() => onPlaySong(song)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group text-left border border-transparent hover:border-white/5 bg-white/[0.02]"
              >
                <img src={song.coverUrl} alt={song.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate group-hover:text-rose-300 transition-colors">{song.title}</p>
                  <p className="text-gray-400 text-sm truncate mt-0.5">{song.artist}</p>
                </div>
                <span className="text-gray-500 text-sm flex-shrink-0 group-hover:text-gray-300 transition-colors">{song.duration}</span>
              </button>
            )) : (
              <div className="text-center py-12 px-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm mt-4">
                <Heart className="w-12 h-12 text-gray-500/50 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No liked songs yet.</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (activeView === 'playlists') {
      return (
        <div className="w-full">
          <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Library
          </button>
          <h1 className="text-4xl text-white font-bold mb-8 tracking-tight drop-shadow-md">Your Playlists</h1>
          <div className="space-y-3">
            {dynamicPlaylists.map((playlist) => (
              <button
                key={`pl-${playlist.id}`}
                onClick={() => playlist.songs[0] && onPlaySong(playlist.songs[0])}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-left border border-transparent hover:border-white/5 bg-white/[0.02] group"
              >
                <img src={playlist.coverUrl} alt={playlist.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold mb-1 truncate group-hover:text-blue-300 transition-colors">{playlist.name}</p>
                  <p className="text-gray-400 text-sm">Playlist • {playlist.songs.length} songs</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (activeView === 'albums') {
      if (selectedAlbum) {
        const albumSongs = groupedByAlbum[selectedAlbum] || []
        return (
          <div className="w-full">
            <button onClick={() => setSelectedAlbum(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /> Back to Albums
            </button>
            
            <div className="flex flex-col items-center mb-10 w-full">
               <div className="relative group">
                 <img src={albumSongs[0]?.coverUrl} alt={selectedAlbum} className="w-56 h-56 rounded-2xl shadow-2xl mb-6 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out border border-white/10" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
               </div>
               <h1 className="text-4xl text-white font-bold text-center mb-2 tracking-tight drop-shadow-md">{selectedAlbum}</h1>
               <p className="text-emerald-400/90 text-sm font-medium">{albumSongs.length} {albumSongs.length === 1 ? 'Song' : 'Songs'} <span className="text-gray-500 mx-2">•</span> {albumSongs[0]?.artist}</p>
            </div>

            <div className="space-y-2">
              {albumSongs.map((song) => (
                <button
                  key={`album-song-${song.id}`}
                  onClick={() => onPlaySong(song)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group text-left border border-transparent hover:border-white/5 bg-white/[0.02]"
                >
                  <div className="flex-1 min-w-0 pl-2">
                    <p className="text-white font-medium truncate group-hover:text-emerald-300 transition-colors">{song.title}</p>
                    <p className="text-gray-400 text-sm truncate mt-0.5">{song.artist}</p>
                  </div>
                  <span className="text-gray-500 text-sm flex-shrink-0 group-hover:text-gray-300 transition-colors">{song.duration}</span>
                </button>
              ))}
            </div>
          </div>
        )
      }

      return (
        <div className="w-full">
          <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Library
          </button>
          
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="text-4xl text-white font-bold tracking-tight drop-shadow-md">Albums</h1>
            <div className="relative w-full">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search albums..."
                value={albumSearchQuery}
                onChange={(e) => setAlbumSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map(([albumName, albumSongs]) => (
                <div
                  key={`album-${albumName}`}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 cursor-pointer group text-left shadow-lg shadow-black/20"
                  onClick={() => {
                    setScrollPos(scrollRef.current?.scrollTop || 0)
                    setSelectedAlbum(albumName)
                  }}
                >
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={albumSongs[0].coverUrl}
                      alt={albumName}
                      className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-white text-base font-semibold mb-1 truncate group-hover:text-emerald-300 transition-colors">{albumName}</h3>
                  <p className="text-gray-400 text-xs font-medium truncate">
                    {albumSongs.length} {albumSongs.length === 1 ? 'Song' : 'Songs'} <span className="mx-1 opacity-50">•</span> {albumSongs[0].artist}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No albums found for "{albumSearchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (activeView === 'recent') {
      return (
        <div className="w-full">
          <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Library
          </button>
          <h1 className="text-4xl text-white font-bold mb-8 tracking-tight drop-shadow-md">Recently Played</h1>
          <div className="space-y-2">
            {recentSongs.length > 0 ? recentSongs.map((song, i) => (
              <button
                key={`recent-${song.id}-${i}`}
                onClick={() => onPlaySong(song)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group text-left border border-transparent hover:border-white/5 bg-white/[0.02]"
              >
                <img src={song.coverUrl} alt={song.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate group-hover:text-amber-300 transition-colors">{song.title}</p>
                  <p className="text-gray-400 text-sm truncate mt-0.5">{song.artist}</p>
                </div>
                <span className="text-gray-500 text-sm flex-shrink-0 group-hover:text-gray-300 transition-colors">{song.duration}</span>
              </button>
            )) : (
              <div className="text-center py-12 px-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm mt-4">
                <Clock className="w-12 h-12 text-gray-500/50 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No recently played songs.</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="w-full">
        <h1 className="text-4xl text-white font-bold mb-8 tracking-tight drop-shadow-md">Your Library</h1>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {libraryItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => setActiveView(item.id)}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 text-left shadow-lg shadow-black/20 group backdrop-blur-sm"
              >
                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                   <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <p className="text-white font-semibold mb-1 text-lg">{item.label}</p>
                <p className="text-gray-400 text-sm font-medium">{item.count} items</p>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div ref={scrollRef} className="pb-40 overflow-y-auto h-full relative bg-[#0a0f12]">
      {/* Creative Background Patterns */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>
      
      <div className="px-4 pt-8 relative z-10">
        {renderContent()}
      </div>
    </div>
  )
}

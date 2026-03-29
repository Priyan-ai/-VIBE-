import { useState, useRef, useLayoutEffect } from 'react';
import { Music, ListMusic, Heart, Clock, ArrowLeft, Search } from 'lucide-react';
import { playlists, songs, Song, recentlyPlayed } from '../data/musicData';

interface LibraryPageProps {
  onPlaySong: (song: Song) => void;
  recentSongs?: Song[];
  likedSongs?: Song[];
}

export function LibraryPage({ onPlaySong, recentSongs = [], likedSongs = [] }: LibraryPageProps) {
  const [activeView, setActiveView] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [albumSearchQuery, setAlbumSearchQuery] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  useLayoutEffect(() => {
    if (activeView === 'albums' && !selectedAlbum && scrollRef.current) {
      scrollRef.current.scrollTop = scrollPos;
    }
  }, [activeView, selectedAlbum, scrollPos]);

  const groupedByAlbum = songs.reduce((acc, song) => {
    if (!acc[song.album]) {
      acc[song.album] = [];
    }
    acc[song.album].push(song);
    return acc;
  }, {} as Record<string, Song[]>);

  const sortedAlbums = Object.entries(groupedByAlbum).sort(([albumA], [albumB]) =>
    albumA.localeCompare(albumB)
  );

  const filteredAlbums = sortedAlbums.filter(([albumName]) => 
    albumName.toLowerCase().includes(albumSearchQuery.toLowerCase())
  );

  const libraryItems = [
    { id: 'liked', icon: Heart, label: 'Liked Songs', count: likedSongs.length, color: 'text-purple-400' },
    { id: 'playlists', icon: ListMusic, label: 'Playlists', count: playlists.length, color: 'text-blue-400' },
    { id: 'albums', icon: Music, label: 'Albums', count: sortedAlbums.length, color: 'text-green-400' },
    { id: 'recent', icon: Clock, label: 'Recently Played', count: recentSongs.length, color: 'text-pink-400' },
  ];

  if (activeView === 'liked') {
    return (
      <div className="pb-40 px-4 pt-6 overflow-y-auto h-full">
        <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft className="w-5 h-5" /> Back to Library
        </button>
        <h1 className="text-3xl text-white mb-6">Liked Songs</h1>
        <div className="space-y-1">
          {likedSongs.length > 0 ? likedSongs.map((song) => (
            <button
              key={`liked-${song.id}`}
              onClick={() => onPlaySong(song)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition group text-left"
            >
              <img src={song.coverUrl} alt={song.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white truncate">{song.title}</p>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>
              <span className="text-gray-400 text-sm flex-shrink-0">{song.duration}</span>
            </button>
          )) : (
            <p className="text-gray-400">No liked songs yet.</p>
          )}
        </div>
      </div>
    );
  }

  if (activeView === 'playlists') {
    return (
      <div className="pb-40 px-4 pt-6 overflow-y-auto h-full">
        <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft className="w-5 h-5" /> Back to Library
        </button>
        <h1 className="text-3xl text-white mb-6">Your Playlists</h1>
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <button
              key={`pl-${playlist.id}`}
              onClick={() => playlist.songs[0] && onPlaySong(playlist.songs[0])}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition text-left"
            >
              <img src={playlist.coverUrl} alt={playlist.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white mb-1 truncate">{playlist.name}</p>
                <p className="text-gray-400 text-sm">Playlist • {playlist.songs.length} songs</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === 'albums') {
    if (selectedAlbum) {
      const albumSongs = groupedByAlbum[selectedAlbum] || [];
      return (
        <div className="pb-40 px-4 pt-6 overflow-y-auto h-full">
          <button onClick={() => setSelectedAlbum(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
            <ArrowLeft className="w-5 h-5" /> Back to Albums
          </button>
          
          <div className="flex flex-col items-center mb-8">
             <img src={albumSongs[0]?.coverUrl} alt={selectedAlbum} className="w-48 h-48 rounded-lg shadow-lg mb-4 object-cover" />
             <h1 className="text-3xl text-white font-bold text-center mb-1">{selectedAlbum}</h1>
             <p className="text-gray-400 text-sm">{albumSongs.length} {albumSongs.length === 1 ? 'Song' : 'Songs'} - {albumSongs[0]?.artist}</p>
          </div>

          <div className="space-y-1">
            {albumSongs.map((song) => (
              <button
                key={`album-song-${song.id}`}
                onClick={() => onPlaySong(song)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition group text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white truncate">{song.title}</p>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
                <span className="text-gray-400 text-sm flex-shrink-0">{song.duration}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div ref={scrollRef} className="pb-40 px-4 pt-6 overflow-y-auto h-full">
        <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft className="w-5 h-5" /> Back to Library
        </button>
        
        <h1 className="text-3xl text-white mb-4">Albums (Movies)</h1>
        
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search albums..."
            value={albumSearchQuery}
            onChange={(e) => setAlbumSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map(([albumName, albumSongs]) => (
              <div
                key={`album-${albumName}`}
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition cursor-pointer group text-left"
                onClick={() => {
                  setScrollPos(scrollRef.current?.scrollTop || 0)
                  setSelectedAlbum(albumName)
                }}
              >
                <div className="relative mb-3">
                <img
                  src={albumSongs[0].coverUrl}
                  alt={albumName}
                  className="w-full aspect-square rounded-lg object-cover"
                />
              </div>
              <h3 className="text-white text-sm mb-1 truncate">{albumName}</h3>
              <p className="text-gray-400 text-xs truncate">
                {albumSongs.length} {albumSongs.length === 1 ? 'Song' : 'Songs'} - {albumSongs[0].artist}
              </p>
            </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No albums found.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeView === 'recent') {
    return (
      <div className="pb-40 px-4 pt-6 overflow-y-auto h-full">
        <button onClick={() => setActiveView(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft className="w-5 h-5" /> Back to Library
        </button>
        <h1 className="text-3xl text-white mb-6">Recently Played</h1>
        <div className="space-y-1">
          {recentSongs.length > 0 ? recentSongs.map((song, i) => (
            <button
              key={`recent-${song.id}-${i}`}
              onClick={() => onPlaySong(song)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition group text-left"
            >
              <img src={song.coverUrl} alt={song.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white truncate">{song.title}</p>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>
              <span className="text-gray-400 text-sm flex-shrink-0">{song.duration}</span>
            </button>
          )) : (
            <p className="text-gray-400">No recently played songs.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40 px-4 pt-6 overflow-y-auto h-full">
      {/* Header */}
      <h1 className="text-3xl text-white mb-6">Your Library</h1>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {libraryItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => setActiveView(item.id)}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition text-left"
            >
              <Icon className={`size-8 ${item.color} mb-3`} />
              <p className="text-white mb-1">{item.label}</p>
              <p className="text-gray-400 text-sm">{item.count} items</p>
            </button>
          );
        })}
      </div>

      {/* Playlists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-white">Your Playlists</h2>
          <button onClick={() => setActiveView('playlists')} className="text-sm text-gray-400 hover:text-white transition">See all</button>
        </div>
        <div className="space-y-2">
          {playlists.slice(0, 3).map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => playlist.songs[0] && onPlaySong(playlist.songs[0])}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition text-left"
            >
              <img
                src={playlist.coverUrl}
                alt={playlist.name}
                className="size-16 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white mb-1 truncate">{playlist.name}</p>
                <p className="text-gray-400 text-sm">
                  Playlist • {playlist.songs.length} songs
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Albums (Movies) */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-white">Albums (Movies)</h2>
          <button onClick={() => setActiveView('albums')} className="text-sm text-gray-400 hover:text-white transition">See all</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {sortedAlbums.slice(0, 4).map(([albumName, albumSongs]) => (
            <div
              key={albumName}
              className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition cursor-pointer group text-left"
              onClick={() => setSelectedAlbum(albumName)}
            >
              <div className="relative mb-3">
                <img
                  src={albumSongs[0].coverUrl}
                  alt={albumName}
                  className="w-full aspect-square rounded-lg object-cover"
                />
              </div>
              <h3 className="text-white text-sm mb-1 truncate">{albumName}</h3>
              <p className="text-gray-400 text-xs truncate">
                {albumSongs.length} {albumSongs.length === 1 ? 'Song' : 'Songs'} - {albumSongs[0].artist}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

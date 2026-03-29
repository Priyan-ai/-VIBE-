import { Search, Play } from 'lucide-react';
import { useState } from 'react';
import { Song, songs, playlists } from '../data/musicData';

interface SearchPageProps {
  onPlaySong: (song: Song) => void;
}

export function SearchPage({ onPlaySong }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { name: 'Hip Hop', color: 'bg-red-500', songs: [songs[0], songs[6]] },
    { name: 'Electronic', color: 'bg-blue-500', songs: [songs[1], songs[7]] },
    { name: 'Rock', color: 'bg-orange-500', songs: [songs[2]] },
    { name: 'Pop', color: 'bg-pink-500', songs: [songs[3]] },
    { name: 'Jazz', color: 'bg-purple-500', songs: [songs[4]] },
    { name: 'Indie', color: 'bg-green-500', songs: [songs[5]] },
  ];

  return (
    <div className="pb-32 px-4 pt-6">
      {/* Header */}
      <h1 className="text-3xl text-white mb-6">Search</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <input
          type="text"
          placeholder="Artists, songs, or albums"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 text-white placeholder-gray-400 rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <div>
          <h2 className="text-xl text-white mb-4">
            {filteredSongs.length} results
          </h2>
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <button
                key={song.id}
                onClick={() => onPlaySong(song)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition group"
              >
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="size-14 rounded object-cover"
                />
                <div className="flex-1 text-left">
                  <p className="text-white">{song.title}</p>
                  <p className="text-gray-400 text-sm">
                    {song.artist} • {song.album}
                  </p>
                </div>
                <Play className="size-5 text-purple-400 opacity-0 group-hover:opacity-100 transition fill-current" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Browse Categories */}
          <h2 className="text-xl text-white mb-4">Browse All</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => category.songs[0] && onPlaySong(category.songs[0])}
                className={`${category.color} rounded-lg p-4 h-28 flex items-start justify-between overflow-hidden relative group hover:scale-105 transition`}
              >
                <h3 className="text-white text-xl font-bold z-10">{category.name}</h3>
                <div className="absolute -right-4 -bottom-4 size-20 bg-black/20 rounded-lg rotate-12 group-hover:rotate-6 transition" />
              </button>
            ))}
          </div>

          {/* Trending Now */}
          <section className="mt-8">
            <h2 className="text-xl text-white mb-4">Trending Now</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {songs.slice(0, 5).map((song) => (
                <div
                  key={song.id}
                  className="flex-shrink-0 w-32 cursor-pointer"
                  onClick={() => onPlaySong(song)}
                >
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-full aspect-square rounded-lg object-cover mb-2"
                  />
                  <p className="text-white text-sm truncate">{song.title}</p>
                  <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

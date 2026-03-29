import { useState } from 'react';
import { useSearchSongs } from '../hooks/useSupabase';

export function SearchSongs() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearchSongs(query, 'song_name');

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs..."
        className="search-input"
      />
      
      {loading && <p>Searching...</p>}
      
      <div className="search-results">
        {results.map(song => (
          <div key={song.id} className="result-item">
            <img src={song.cover_image_url} alt={song.song_name} />
            <h4>{song.song_name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
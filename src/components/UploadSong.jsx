import { useState } from 'react';
import { useSongUpload } from '../hooks/useSupabase';

export function UploadSong() {
  const { uploadSong, uploading, progress, error } = useSongUpload();
  const [formData, setFormData] = useState({
    songName: '',
    movieName: '',
    musicDirector: '',
    language: 'Tamil',
    duration: '',
    releaseYear: new Date().getFullYear(),
  });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!audioFile || !coverFile) {
      alert('Please select both audio and cover image');
      return;
    }

    try {
      await uploadSong(audioFile, coverFile, formData);
      alert('Song uploaded successfully!');
      // Reset form
      setFormData({
        songName: '',
        movieName: '',
        musicDirector: '',
        language: 'Tamil',
        duration: '',
        releaseYear: new Date().getFullYear(),
      });
      setAudioFile(null);
      setCoverFile(null);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="form-group">
        <label>Song Name</label>
        <input
          type="text"
          value={formData.songName}
          onChange={(e) => setFormData({...formData, songName: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Movie/Album Name</label>
        <input
          type="text"
          value={formData.movieName}
          onChange={(e) => setFormData({...formData, movieName: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Music Director</label>
        <input
          type="text"
          value={formData.musicDirector}
          onChange={(e) => setFormData({...formData, musicDirector: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Language</label>
        <select
          value={formData.language}
          onChange={(e) => setFormData({...formData, language: e.target.value})}
        >
          <option>Tamil</option>
          <option>English</option>
        </select>
      </div>

      <div className="form-group">
        <label>Duration (seconds)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
        />
      </div>

      <div className="form-group">
        <label>Release Year</label>
        <input
          type="number"
          value={formData.releaseYear}
          onChange={(e) => setFormData({...formData, releaseYear: parseInt(e.target.value)})}
        />
      </div>

      <div className="form-group">
        <label>Audio File (MP3, WAV, M4A)</label>
        <input
          type="file"
          accept=".mp3,.wav,.m4a"
          onChange={(e) => setAudioFile(e.target.files?.[0])}
          required
        />
      </div>

      <div className="form-group">
        <label>Cover Image (JPG, PNG, WebP)</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => setCoverFile(e.target.files?.[0])}
          required
        />
      </div>

      {uploading && (
        <div className="progress">
          <div style={{ width: `${progress}%` }}>{progress}%</div>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Song'}
      </button>
    </form>
  );
}
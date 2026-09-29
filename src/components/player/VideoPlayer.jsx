import { useEffect, useRef, useState } from 'react';

const playbackOptions = [0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({ title, source }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState('1080p');

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
  }, [speed]);

  const onTogglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const value = (video.currentTime / video.duration) * 100 || 0;
    setProgress(value);
  };

  return (
    <div className="video-player-shell">
      <div className="video-player-header">
        <h2>{title}</h2>
      </div>
      <video
        ref={videoRef}
        className="video-element"
        src={source}
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setProgress(0)}
        poster="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
      />

      <div className="player-controls">
        <div className="progress-row">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
            aria-label="Playback progress"
          />
        </div>

        <div className="control-row">
          <div className="control-group left-group">
            <button type="button" className="control-button" onClick={onTogglePlay} aria-label="Play or pause video">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button type="button" className="control-button" aria-label="Back button">←</button>
            <button type="button" className="control-button" aria-label="Next episode">⏭</button>
          </div>

          <div className="control-group right-group">
            <label className="compact-select">
              Speed
              <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                {playbackOptions.map((option) => (
                  <option key={option} value={option}>{option}x</option>
                ))}
              </select>
            </label>
            <label className="compact-select">
              Quality
              <select value={quality} onChange={(event) => setQuality(event.target.value)}>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
              </select>
            </label>
            <label className="compact-select">
              Volume
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                aria-label="Volume"
              />
            </label>
            <button type="button" className="control-button" aria-label="Toggle subtitles">CC</button>
            <button type="button" className="control-button" aria-label="Fullscreen">⤢</button>
          </div>
        </div>
      </div>
    </div>
  );
}

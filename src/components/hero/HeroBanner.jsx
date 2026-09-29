import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export function HeroBanner({ movie, onPlay, onInfo }) {
  if (!movie) return null;

  return (
    <section className="hero-banner" style={{ backgroundImage: `linear-gradient(rgba(11,11,11,0.2), rgba(11,11,11,1)), url(${movie.backdrop})` }}>
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Featured Tonight</p>
          <h1>{movie.title}</h1>
          <p className="hero-description">{movie.description}</p>
          <div className="hero-meta">
            <span>{movie.year}</span>
            <span>{movie.maturityRating}</span>
            <span>{movie.genres.join(' • ')}</span>
          </div>
          <div className="hero-actions">
            <Button type="button" onClick={onPlay}>▶ Watch Now</Button>
            <Button type="button" variant="secondary" onClick={onInfo}>ⓘ More Info</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

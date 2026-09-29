import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { MovieCard } from '../../components/movie/MovieCard';
import { useFetch } from '../../hooks/useFetch';
import { useWatchlist } from '../../hooks/useWatchlist';
import { movieService } from '../../services/movieService';
import { notify } from '../../components/common/Toast';

export function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { data: movie, loading } = useFetch(() => movieService.getMovieById(id), [id]);

  if (loading) return <div className="container page-stack">Loading movie details…</div>;
  if (!movie) {
    return (
      <div className="container page-stack empty-state">
        <h3>Movie not found.</h3>
        <Link to="/home" className="btn btn-primary">Return to Home</Link>
      </div>
    );
  }

  const inList = isInWatchlist(movie.id, 'movie');

  const handleToggleWatchlist = () => {
    if (inList) {
      removeFromWatchlist(movie.id, 'movie');
      notify(`${movie.title} removed from My List.`, 'info');
      return;
    }

    addToWatchlist({ ...movie, type: 'movie' });
    notify(`${movie.title} added to My List.`, 'success');
  };

  return (
    <div className="movie-detail-page">
      <div className="detail-hero" style={{ backgroundImage: `linear-gradient(rgba(11,11,11,.3), rgba(11,11,11,1)), url(${movie.backdrop})` }}>
        <div className="container detail-hero-inner">
          <img src={movie.poster} alt={movie.title} className="detail-poster" />
          <div className="detail-copy">
            <p className="eyebrow">Movie</p>
            <h1>{movie.title}</h1>
            <div className="hero-meta">
              <span>{movie.year}</span>
              <span>{movie.maturityRating}</span>
              <span>{movie.duration}</span>
            </div>
            <p>{movie.description}</p>
            <div className="detail-actions">
              <Button type="button" onClick={() => navigate(`/player/${movie.id}`)}>▶ Watch</Button>
              <Button type="button" variant="secondary" onClick={handleToggleWatchlist}>{inList ? 'Remove from My List' : 'Add to My List'}</Button>
              <Button type="button" variant="ghost" onClick={() => navigate(`/movie/${movie.id}`)}>Trailer</Button>
            </div>
            <div className="detail-meta-text">
              <span><strong>Rating:</strong> {movie.rating} / 10</span>
              <span><strong>Genres:</strong> {movie.genres.join(', ')}</span>
              <span><strong>Cast:</strong> {movie.cast.join(', ')}</span>
              <span><strong>Director:</strong> {movie.director}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container page-stack">
        <section>
          <h2>More Like This</h2>
          <div className="movie-grid mini-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <MovieCard key={index} item={{ ...movie, id: movie.id + index + 1, title: `${movie.title} ${index + 1}` }} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

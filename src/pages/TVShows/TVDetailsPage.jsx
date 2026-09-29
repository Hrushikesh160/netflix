import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useFetch } from '../../hooks/useFetch';
import { useWatchlist } from '../../hooks/useWatchlist';
import { movieService } from '../../services/movieService';
import { notify } from '../../components/common/Toast';

export function TVDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { data: show, loading } = useFetch(() => movieService.getTVShowById(id), [id]);

  if (loading) return <div className="container page-stack">Loading TV details…</div>;
  if (!show) {
    return <div className="container page-stack empty-state"><h3>Show not found.</h3></div>;
  }

  const inList = isInWatchlist(show.id, 'tv');
  const season = show.seasons?.[0];

  const handleToggleWatchlist = () => {
    if (inList) {
      removeFromWatchlist(show.id, 'tv');
      notify(`${show.title} removed from My List.`, 'info');
      return;
    }

    addToWatchlist({ ...show, type: 'tv' });
    notify(`${show.title} added to My List.`, 'success');
  };

  return (
    <div className="movie-detail-page">
      <div className="detail-hero" style={{ backgroundImage: `linear-gradient(rgba(11,11,11,.3), rgba(11,11,11,1)), url(${show.backdrop})` }}>
        <div className="container detail-hero-inner">
          <img src={show.poster} alt={show.title} className="detail-poster" />
          <div className="detail-copy">
            <p className="eyebrow">TV Show</p>
            <h1>{show.title}</h1>
            <div className="hero-meta">
              <span>{show.year}</span>
              <span>{show.genres.join(' • ')}</span>
              <span>{show.seasons.length} seasons</span>
            </div>
            <p>{show.description}</p>
            <div className="detail-actions">
              <Button type="button" onClick={() => navigate(`/player/${show.id}`)}>▶ Watch</Button>
              <Button type="button" variant="secondary" onClick={handleToggleWatchlist}>{inList ? 'Remove from My List' : 'Add to My List'}</Button>
            </div>
            <div className="detail-meta-text">
              <span><strong>Rating:</strong> {show.rating} / 10</span>
              <span><strong>Genres:</strong> {show.genres.join(', ')}</span>
              <span><strong>Seasons:</strong> {show.seasons.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container page-stack">
        <section className="episode-panel">
          <h2>Season 1</h2>
          <div className="episode-list">
            {season?.episodes?.map((episode) => (
              <div key={episode.id} className="episode-item">
                <span>S01E{String(episode.id).padStart(2, '0')}</span>
                <strong>{episode.title}</strong>
                <small>{episode.duration}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

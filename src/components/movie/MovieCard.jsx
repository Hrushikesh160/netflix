import { Link, useNavigate } from 'react-router-dom';
import { useWatchlist } from '../../hooks/useWatchlist';
import { notify } from '../common/Toast';

export function MovieCard({ item }) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isTV = item.type === 'tv';
  const detailPath = isTV ? `/tv/${item.id}` : `/movie/${item.id}`;
  const inList = isInWatchlist(item.id, item.type || 'movie');

  const handleAdd = (event) => {
    event.preventDefault();
    addToWatchlist(item);
    notify(`${item.title} added to My List.`, 'success');
  };

  const handleRemove = (event) => {
    event.preventDefault();
    removeFromWatchlist(item.id, item.type || 'movie');
    notify(`${item.title} removed from My List.`, 'info');
  };

  const handlePlay = (event) => {
    event.preventDefault();
    navigate(`/player/${item.id}`);
  };

  return (
    <article className="movie-card">
      <Link to={detailPath} className="movie-poster-link" aria-label={`Open ${item.title}`}>
        <img className="movie-poster" src={item.poster} alt={item.title} loading="lazy" />
      </Link>

      <div className="movie-card-body">
        <div className="movie-meta-row">
          <h3>{item.title}</h3>
          <span>{item.year}</span>
        </div>
        <p className="movie-card-meta">
          {item.rating} ★ • {item.genres?.slice(0, 2).join(' • ')}
        </p>
        <div className="movie-card-actions">
          <button type="button" className="action-button play" onClick={handlePlay} aria-label={`Play ${item.title}`}>
            ▶
          </button>
          {inList ? (
            <button type="button" className="action-button" onClick={handleRemove} aria-label={`Remove ${item.title} from my list`}>
              −
            </button>
          ) : (
            <button type="button" className="action-button" onClick={handleAdd} aria-label={`Add ${item.title} to my list`}>
              ＋
            </button>
          )}
          <Link to={detailPath} className="action-button" aria-label={`More info about ${item.title}`}>
            ⓘ
          </Link>
        </div>
      </div>
    </article>
  );
}

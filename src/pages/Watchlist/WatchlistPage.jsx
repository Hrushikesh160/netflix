import { useWatchlist } from '../../hooks/useWatchlist';
import { MovieGrid } from '../../components/movie/MovieGrid';

export function WatchlistPage() {
  const { watchlist } = useWatchlist();

  if (!watchlist.length) {
    return (
      <div className="container page-stack empty-state">
        <h1 className="page-title">My List</h1>
        <h3>Your list is empty.</h3>
        <p>Movies and shows you add will appear here.</p>
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <h1 className="page-title">My List</h1>
      <MovieGrid items={watchlist} />
    </div>
  );
}

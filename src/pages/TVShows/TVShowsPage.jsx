import { useFetch } from '../../hooks/useFetch';
import { MovieGrid } from '../../components/movie/MovieGrid';
import { MovieGridSkeleton } from '../../components/common/Skeleton';
import { movieService } from '../../services/movieService';

export function TVShowsPage() {
  const { data: tvShows = [], loading } = useFetch(() => movieService.getTVShows(), []);

  if (loading) {
    return <div className="container page-stack"><MovieGridSkeleton count={8} /></div>;
  }

  return (
    <div className="container page-stack">
      <h1 className="page-title">TV Shows</h1>
      <MovieGrid title="Popular Series" items={tvShows} />
    </div>
  );
}

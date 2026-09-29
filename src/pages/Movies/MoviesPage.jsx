import { useFetch } from '../../hooks/useFetch';
import { MovieGrid } from '../../components/movie/MovieGrid';
import { MovieGridSkeleton } from '../../components/common/Skeleton';
import { movieService } from '../../services/movieService';

export function MoviesPage() {
  const { data: movies = [], loading } = useFetch(() => movieService.getMovies(), []);

  if (loading) {
    return <div className="container page-stack"><MovieGridSkeleton count={8} /></div>;
  }

  return (
    <div className="container page-stack">
      <h1 className="page-title">Movies</h1>
      <MovieGrid title="Browse Movies" items={movies} />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../../components/hero/HeroBanner';
import { MovieRow } from '../../components/movie/MovieRow';
import { MovieGridSkeleton } from '../../components/common/Skeleton';
import { useFetch } from '../../hooks/useFetch';
import { movieService } from '../../services/movieService';

export function HomePage() {
  const navigate = useNavigate();
  const { data: movies = [], loading } = useFetch(() => movieService.getMovies(), []);

  if (loading) {
    return <div className="container page-stack"><MovieGridSkeleton count={6} /></div>;
  }

  const featured = movies[0];
  const continueWatching = movies.slice(1, 6);
  const recommended = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="container page-stack">
      <HeroBanner
        movie={featured}
        onPlay={() => navigate(`/player/${featured.id}`)}
        onInfo={() => navigate(`/movie/${featured.id}`)}
      />

      <MovieRow title="Trending Now" items={movies.slice(0, 8)} />
      <MovieRow title="Continue Watching" items={continueWatching} />
      <MovieRow title="Popular Movies" items={movies.slice(2, 10)} />
      <MovieRow title="Top Rated" items={recommended} />
      <MovieRow title="Recently Added" items={movies.slice(4, 11)} />
      <MovieRow title="Recommended For You" items={recommended.slice(0, 7)} />
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { HeroBanner } from '../../components/hero/HeroBanner';
import { MovieRow } from '../../components/movie/MovieRow';
import { MovieGridSkeleton } from '../../components/common/Skeleton';
import { useFetch } from '../../hooks/useFetch';
import { movieService } from '../../services/movieService';

export function LandingPage() {
  const navigate = useNavigate();
  const { data: movies = [], loading } = useFetch(() => movieService.getMovies(), []);

  const featured = movies[0] || null;
  const trending = movies.slice(0, 8);
  const popular = movies.slice(2, 10);

  if (loading) {
    return <div className="container page-stack"><MovieGridSkeleton count={6} /></div>;
  }

  return (
    <div className="landing-page">
      <HeroBanner
        movie={featured}
        onPlay={() => navigate(`/player/${featured?.id}`)}
        onInfo={() => navigate(`/movie/${featured?.id}`)}
      />

      <div className="container page-stack">
        <MovieRow title="Trending Now" items={trending} />
        <MovieRow title="Popular Movies" items={popular} />
        <MovieRow title="New Releases" items={movies.slice(5, 12)} />
        <MovieRow title="Top Rated" items={[...movies].sort((a, b) => b.rating - a.rating).slice(0, 8)} />

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Ready to start streaming?</p>
            <h2>Pick your next obsession.</h2>
          </div>
          <Link to="/signup" className="btn btn-primary">Create account</Link>
        </section>
      </div>
    </div>
  );
}

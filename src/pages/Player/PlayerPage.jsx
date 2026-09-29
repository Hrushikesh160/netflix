import { useNavigate, useParams } from 'react-router-dom';
import { VideoPlayer } from '../../components/player/VideoPlayer';
import { useFetch } from '../../hooks/useFetch';
import { movieService } from '../../services/movieService';

export function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, loading } = useFetch(() => movieService.getMovieById(id), [id]);

  if (loading) return <div className="container page-stack">Loading player…</div>;
  if (!movie) {
    return (
      <div className="container page-stack empty-state">
        <h3>Episode not found.</h3>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/home')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Back</button>
      <VideoPlayer title={movie.title} source={movie.trailer} />
    </div>
  );
}

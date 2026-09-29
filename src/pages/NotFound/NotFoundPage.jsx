import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container page-stack empty-state">
      <h1>404</h1>
      <h3>Page not found.</h3>
      <p>The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/home" className="btn btn-primary">Return Home</Link>
    </div>
  );
}

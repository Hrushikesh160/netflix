export function MovieCardSkeleton() {
  return <div className="movie-card skeleton-card" aria-label="Loading content" />;
}

export function MovieGridSkeleton({ count = 6 }) {
  return (
    <div className="movie-grid">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return <div className="hero-skeleton" aria-label="Loading hero" />;
}

export function DetailsSkeleton() {
  return <div className="details-skeleton" aria-label="Loading details" />;
}

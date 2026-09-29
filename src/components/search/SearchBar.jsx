export function SearchBar({ value, onChange, placeholder = 'Search movies, shows or genres' }) {
  return (
    <label className="search-box" aria-label="Search content">
      <span>⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'streamflix-watchlist';
const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    setWatchlist((current) => {
      if (current.some((entry) => entry.id === item.id && entry.type === item.type)) {
        return current;
      }
      return [...current, item];
    });
  };

  const removeFromWatchlist = (id, type) => {
    setWatchlist((current) => current.filter((entry) => !(entry.id === id && entry.type === type)));
  };

  const isInWatchlist = (id, type) => watchlist.some((entry) => entry.id === id && entry.type === type);

  const value = useMemo(
    () => ({ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }),
    [watchlist],
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }

  return context;
};

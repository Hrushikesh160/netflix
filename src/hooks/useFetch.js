import { useEffect, useState } from 'react';

export function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    Promise.resolve(fetcher())
      .then((result) => {
        if (mounted) {
          setData(result ?? []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setData([]);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

import { useEffect, useState } from 'react';

import { fetchSpotifyEmbed, type SpotifyEmbedConfig } from '@/lib/spotify';

export function useSpotifyEmbed() {
  const [embed, setEmbed] = useState<SpotifyEmbedConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchSpotifyEmbed().then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setEmbed(result.data);
        setError('');
      } else {
        setEmbed(null);
        setError(result.message);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { embed, loading, error };
}

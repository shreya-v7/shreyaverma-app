import { useEffect, useState } from 'react';

import { blogsPosts } from '@/data/diary';
import { fetchSubstackPosts, type BlogPost } from '@/lib/substack';

export function useBlogPosts(limit = 24) {
  const [posts, setPosts] = useState<BlogPost[]>(blogsPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchSubstackPosts(limit).then((result) => {
      if (cancelled) return;

      if (result.ok && result.data.posts.length > 0) {
        const localOnly = blogsPosts.filter((p) => !p.link?.includes('substack.com'));
        const substackIds = new Set(result.data.posts.map((p) => p.id));
        const merged = [
          ...result.data.posts,
          ...localOnly.filter((p) => !substackIds.has(p.id)),
        ];
        setPosts(merged);
        setError('');
      } else if (!result.ok) {
        setPosts(blogsPosts);
        setError(result.message);
      } else {
        setPosts(blogsPosts);
        setError('');
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { posts, loading, error };
}

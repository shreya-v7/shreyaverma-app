import type { PersonalPost } from '@/types';

export type BlogPost = PersonalPost & { source?: 'substack' | 'local' };

export type SubstackPostsPayload = {
  posts: BlogPost[];
  publicationUrl?: string;
};

const API_BASE = 'https://shreyaverma.netlify.app';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; message: string };
type Result<T> = Ok<T> | Err;

async function call<T>(target: string): Promise<Result<T>> {
  try {
    const res = await fetch(target, { cache: 'no-store' });
    const ct = res.headers.get('content-type') || '';
    if (res.ok && !ct.includes('application/json')) {
      return { ok: false, message: 'API returned an unexpected response.' };
    }

    const body = (await res.json().catch(() => ({}))) as Record<string, unknown> & {
      error?: string;
      message?: string;
    };

    if (!res.ok || body.error) {
      const detail = (body.message as string) || (body.error as string) || res.statusText;
      return { ok: false, message: detail || `HTTP ${res.status}` };
    }

    return { ok: true, data: body as T };
  } catch (e) {
    const hint = e instanceof Error ? e.message : String(e);
    return { ok: false, message: `Network error: ${hint}` };
  }
}

export function fetchSubstackPosts(limit = 24, offset = 0) {
  const q = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  return call<SubstackPostsPayload>(`${API_BASE}/api/substack-posts?${q}`);
}

export function isSubstackPost(post: PersonalPost & { source?: string }): boolean {
  return post.source === 'substack' || Boolean(post.link?.includes('substack.com'));
}

export function getBlogReadLabel(post: PersonalPost & { source?: string }): string {
  if (isSubstackPost(post)) return 'Read on Substack';
  if (post.link?.includes('medium.com')) return 'Read on Medium';
  return 'Read post';
}

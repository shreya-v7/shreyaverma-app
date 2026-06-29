const API_BASE = 'https://shreyaverma.netlify.app';

export type SpotifyEmbedItem = {
  id: string;
  type: 'playlist' | 'track' | 'artist';
  embedUrl: string;
  spotifyUrl: string;
  height: number;
  title?: string;
  imageUrl?: string;
};

export type SpotifyEmbedConfig = {
  playlists: SpotifyEmbedItem[];
  topArtists: SpotifyEmbedItem[];
  favoriteTrack: SpotifyEmbedItem | null;
};

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; message: string };
export type SpotifyResult<T> = Ok<T> | Err;

async function call<T>(target: string): Promise<SpotifyResult<T>> {
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

export function fetchSpotifyEmbed() {
  return call<SpotifyEmbedConfig>(`${API_BASE}/api/spotify-playlist?mode=embed`);
}

export function stripSpotifyTitleSuffix(value: string | undefined, fallback = ''): string {
  if (!value) return fallback;
  const t = value.replace(/\s*\|\s*Spotify\s*$/i, '').trim();
  return t || fallback;
}

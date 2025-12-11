const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Simple fetch wrapper to keep requests consistent.
 * Candidates can replace this with their favorite data layer.
 */
export function useApi() {
  async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }

  async function post<T>(path: string, body?: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {})
    });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }

  return { get, post, API_URL };
}



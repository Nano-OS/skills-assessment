import { BootState, AppConfig } from '../types';
import { useApi } from '../hooks/useApi';

/**
 * Boot helpers give candidates a starting point.
 * The implementation is intentionally incomplete.
 */
export async function startHandshake(): Promise<{ sessionKey: string }> {
  const { post } = useApi();
  // TODO: generate auth header based on hints/boot-sequence.md
  return post('/v1/handshake');
}

export async function verifyTenant(sessionKey: string): Promise<{ tenantId: string }> {
  const { post } = useApi();
  // TODO: query Postgres for the active tenant and verify with API
  return post('/v1/verify-tenant', { sessionKey });
}

export async function fetchConfig(tenantId: string): Promise<AppConfig> {
  const { get } = useApi();
  return get(`/v1/config/${tenantId}.json`);
}

export async function connectWebsocket(config: AppConfig, sessionKey: string) {
  // TODO: generate HMAC signature and connect to wsEndpoint
  console.log('Connect to websocket with', config.wsEndpoint, sessionKey);
}

export function bootReducer(state: BootState, partial: Partial<BootState>): BootState {
  return { ...state, ...partial };
}



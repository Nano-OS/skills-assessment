export interface Worker {
  id: string;
  name: string;
  status: 'idle' | 'busy' | 'offline' | 'error';
  tokenBudget: number;
  lastActive: string;
  lastResponse?: string;
  currentTask?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  tokenCount?: number;
}

export interface StreamToken {
  token: string;
  index: number;
}

export interface StreamComplete {
  token: '[DONE]';
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface StreamError {
  error: string;
  code: string;
}

export type StreamEvent = StreamToken | StreamComplete | StreamError;

export interface BootState {
  step: 'handshake' | 'verify' | 'config' | 'websocket' | 'complete';
  sessionKey?: string;
  tenantId?: string;
  config?: AppConfig;
  error?: string;
}

export interface AppConfig {
  appName: string;
  webhookSecret: string;
  features: {
    chat: boolean;
    streaming: boolean;
    tokenTracking: boolean;
  };
  wsEndpoint: string;
  wsAuth: string;
}



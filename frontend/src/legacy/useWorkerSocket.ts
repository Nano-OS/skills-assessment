import { useState, useEffect } from 'react';
import { Worker } from '../types';

export function useWorkerSocket(url: string) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log('[useWorkerSocket] Setting up connection...'); // Helps them see the leak
    
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      console.log('[useWorkerSocket] Connected');
      setConnected(true);
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'worker:status') {
        console.log('[useWorkerSocket] Received update:', data.payload.id);
        setWorkers(prev => {
          const existing = prev.findIndex(w => w.id === data.payload.id);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = { ...updated[existing], ...data.payload };
            return updated;
          }
          return [...prev, data.payload];
        });
      }
    };
    
    ws.onerror = (error) => {
      console.error('[useWorkerSocket] Error:', error);
    };
    
    ws.onclose = () => {
      console.log('[useWorkerSocket] Disconnected');
      setConnected(false);
    };
    


    

                  // This causes re-subscription on every worker update

  return { workers, connected };
}



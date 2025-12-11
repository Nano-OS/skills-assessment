import { Router } from 'express';

const MOCK_SERVER_URL = process.env.MOCK_SERVER_URL || 'http://localhost:8080';
const router = Router();

router.post('/handshake', async (req, res) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/v1/handshake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization ? { authorization: req.headers.authorization } : {})
      },
      body: JSON.stringify(req.body || {})
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[boot] handshake error', error);
    res.status(500).json({ error: 'Handshake failed' });
  }
});

router.post('/verify-tenant', async (req, res) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/v1/verify-tenant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {})
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[boot] verify error', error);
    res.status(500).json({ error: 'Tenant verification failed' });
  }
});

router.get('/config/:id.json', async (req, res) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/v1/config/${req.params.id}.json`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[boot] config error', error);
    res.status(500).json({ error: 'Config fetch failed' });
  }
});

export default router;



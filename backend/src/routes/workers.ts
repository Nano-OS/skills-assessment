import { Router } from 'express';
import { workerService } from '../legacy/WorkerService';

const MOCK_SERVER_URL = process.env.MOCK_SERVER_URL || 'http://localhost:8080';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/v1/workers`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[workers] list error', error);
    res.status(500).json({ error: 'Failed to load workers' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const worker = await workerService.getWorker(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    console.error('[workers] get error', error);
    res.status(500).json({ error: 'Failed to load worker' });
  }
});

router.post('/:id/deduct-tokens', async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'amount is required' });
  }

  try {
    const result = await workerService.deductTokens(req.params.id, amount);
    res.json(result);
  } catch (error) {
    console.error('[workers] deduct error', error);
    res.status(500).json({ error: 'Failed to deduct tokens' });
  }
});

router.post('/:id/reset-budget', async (req, res) => {
  const amount = typeof req.body?.amount === 'number' ? req.body.amount : 10000;
  try {
    await workerService.resetBudget(req.params.id, amount);
    res.json({ ok: true, amount });
  } catch (error) {
    console.error('[workers] reset error', error);
    res.status(500).json({ error: 'Failed to reset budget' });
  }
});

router.post('/:id/chat', async (req, res) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/v1/worker/${req.params.id}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body || {})
    });
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error('[workers] chat proxy error', error);
    res.status(500).json({ error: 'Failed to proxy chat request' });
  }
});

export default router;


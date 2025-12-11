import express from 'express';
import cors from 'cors';
import workersRouter from './routes/workers';
import bootRouter from './routes/boot';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/workers', workersRouter);
app.use('/api/boot', bootRouter);

app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`);
});



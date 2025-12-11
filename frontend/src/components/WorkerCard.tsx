import { Worker } from '../types';

interface WorkerCardProps {
  worker: Worker;
}

const statusColor: Record<Worker['status'], string> = {
  idle: 'bg-emerald-500/70',
  busy: 'bg-amber-500/70',
  offline: 'bg-slate-500/70',
  error: 'bg-rose-500/70'
};

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">#{worker.id.slice(0, 8)}</p>
          <h3 className="text-lg font-semibold text-white">{worker.name}</h3>
        </div>
        <span className={`h-2 w-2 rounded-full ${statusColor[worker.status]}`} aria-hidden />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div className="rounded border border-slate-800 px-3 py-2">
          <dt className="text-slate-400">Status</dt>
          <dd className="font-semibold text-white capitalize">{worker.status}</dd>
        </div>
        <div className="rounded border border-slate-800 px-3 py-2">
          <dt className="text-slate-400">Token Budget</dt>
          <dd className="font-semibold text-white">{worker.tokenBudget.toLocaleString()}</dd>
        </div>
      </dl>
    </article>
  );
}



import { WorkerCard } from './WorkerCard';
import { Worker } from '../types';

const placeholderWorkers: Worker[] = [
  {
    id: 'a1b2c3d4-0000-0000-0000-000000000001',
    name: 'Agent Alpha',
    status: 'idle',
    tokenBudget: 10000,
    lastActive: new Date().toISOString()
  },
  {
    id: 'a1b2c3d4-0000-0000-0000-000000000002',
    name: 'Agent Beta',
    status: 'busy',
    tokenBudget: 8500,
    lastActive: new Date().toISOString()
  }
];

export function WorkerList() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Workers</h2>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          build me in Tier 1
        </span>
      </div>
      <div className="space-y-2">
        {placeholderWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
}



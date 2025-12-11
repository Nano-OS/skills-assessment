import { useState } from 'react';
import { Layout } from './components/Layout';
import { WorkerList } from './components/WorkerList';
import { WorkerChat } from './components/WorkerChat';
import { useApi } from './hooks/useApi';
import { BootState } from './types';

function LockedState() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white">System Locked</h2>
      <p className="mt-2 text-sm text-slate-300">
        Complete the boot sequence to unlock the worker dashboard. Start in{' '}
        <code className="rounded bg-slate-800 px-2 py-1 text-xs text-amber-300">src/lib/boot.ts</code>.
      </p>
    </div>
  );
}

function UnlockedState() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="lg:col-span-1">
        <WorkerList />
      </section>
      <section className="lg:col-span-2">
        <WorkerChat />
      </section>
    </div>
  );
}

function App() {
  const [bootState] = useState<BootState>({
    step: 'handshake'
  });
  useApi(); // placeholder usage to show hook is wired

  const isUnlocked = bootState.step === 'complete';

  return (
    <Layout>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Nano Systems</p>
          <h1 className="text-3xl font-bold text-white">Worker Control Panel</h1>
          <p className="text-sm text-slate-400">Build the dashboard, complete the boot, fix the bugs.</p>
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200">
          Boot status: <span className="font-semibold text-amber-300">{bootState.step}</span>
        </div>
      </header>

      {isUnlocked ? <UnlockedState /> : <LockedState />}
    </Layout>
  );
}

export default App;



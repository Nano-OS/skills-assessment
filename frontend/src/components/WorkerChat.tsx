import { useState } from 'react';
import { WorkerOutput } from '../legacy/WorkerOutput';
import { ChatMessage } from '../types';

const starter: ChatMessage[] = [
  {
    id: 'intro-1',
    role: 'assistant',
    content: 'Welcome! Wire me up to /v1/worker/:id/chat to start streaming.',
    timestamp: Date.now()
  }
];

export function WorkerChat() {
  const [messages] = useState<ChatMessage[]>(starter);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement in Tier 3
    setInput('');
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Worker Chat</h2>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          build me in Tier 3
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-md border border-slate-800 bg-slate-950/50 p-4">
        {messages.map((msg) => (
          <article key={msg.id} className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{msg.role}</p>
            <WorkerOutput content={msg.content} />
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
          placeholder="Ask a worker..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow hover:bg-emerald-400"
        >
          Send
        </button>
      </form>
    </div>
  );
}



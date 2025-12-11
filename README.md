# Nano Engineering Assessment

Welcome to the Nano take-home assessment. You have **8 hours** to complete as much as you can.

## Quick Start
```bash
# Clone and start
git clone <this-repo>
cd skills-assessment
docker-compose up -d

# Wait for services to be healthy, then:
cd frontend && npm install && npm run dev
# In another terminal:
cd backend && npm install && npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:3001  
Mock Server: http://localhost:8080 (don't access directly)

## The Assessment

### Boot Sequence (1 hour)
The app is "locked." Complete the initialization sequence to unlock it:
1. **Handshake:** `POST /v1/handshake` with the correct auth header
2. **Verify:** Query Postgres for the active tenant, verify it
3. **Connect:** Establish WebSocket connection with proper signature

Check `/frontend/src/lib/boot.ts` for starter code.

### Tier 1: Worker List (1.5 hours)
Build the main dashboard showing all workers.
- Fetch from `GET /v1/workers`
- Display as cards with name, status, token budget
- Loading and error states

### Tier 2: Real-Time Updates (2 hours)
- Connect to WebSocket for live worker status updates
- Visual indicator when a worker's status changes
- **Fix Bug #1:** Memory leak in `/frontend/src/legacy/useWorkerSocket.ts`

### Tier 3: LLM Chat (2.5 hours)
Build a chat interface with workers.
- Send prompts to `POST /v1/worker/:id/chat`
- Stream response token-by-token
- Handle errors gracefully (timeouts, malformed responses)
- Display token usage
- **Fix Bug #2:** Race condition in `/backend/src/legacy/WorkerService.ts`
- **Fix Bug #3:** XSS vulnerability in `/frontend/src/legacy/WorkerOutput.tsx`

### Tier 4: Polish (1 hour)
Make it feel like a product. Add micro-interactions, empty states, responsive layout—whatever you'd add before shipping.

**Bonus (pick any):**
- 🔄 Regenerate response with diff view
- 💰 Cost display per message
- 📊 Token visualization while streaming
- 💾 Conversation history
- 🎤 Voice input
- 📝 Architecture RFC (no code)

## Test Scripts
```bash
# Test the race condition bug
cd backend && npm run test:budget
```

## Hints

You have 3 hint tokens. Each costs 5% on that section.

To use a hint:
1. Commit your work: `git commit -m "HINT-REQUEST: [topic]"`
2. Document in HINTS.md what you've tried
3. Open the corresponding file in `/hints/`

## Deliverables

1. **This repo** with your code
2. **README updates** with:
   - Your state management approach
   - Bug fix explanations (1-2 sentences each)
   - What you'd improve with more time
3. **Loom video (< 8 min):**
   - Boot sequence working
   - Each bug before/after fix
   - Walk through your chat feature
   - One thing you're proud of, one you'd change

## API Reference

### Boot Sequence
- `POST /v1/handshake` - Start auth flow
- `POST /v1/verify-tenant` - Verify tenant access
- `GET /v1/config/:id.json` - Fetch app config

### Workers
- `GET /v1/workers` - List all workers
- `POST /v1/worker/:id/chat` - Chat with worker (SSE stream)
- `POST /v1/worker/:id/deduct-tokens` - Deduct from budget

### WebSocket
- `ws://localhost:8080/ws?sessionKey=<session-key>&token=<hmac-signature>`

## Questions?

Make reasonable assumptions and note them. We value your judgment.

Good luck! 🚀



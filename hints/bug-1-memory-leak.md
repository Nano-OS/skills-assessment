# Bug 1: Memory Leak

## The Problem
Look at the useEffect in useWorkerSocket.ts. Two issues:

1. **Missing cleanup:** When the component unmounts or the effect re-runs, 
   the WebSocket connection is never closed. Old connections pile up.

2. **Wrong dependency array:** The effect depends on `workers`, which changes 
   every time a message arrives. This causes the effect to re-run (and create 
   a new connection) on every single WebSocket message.

## The Fix
1. Return a cleanup function that closes the WebSocket
2. Change the dependency array to only include `url` (or empty array if url never changes)

## How to Verify
- Open browser DevTools → Network → WS tab
- Before fix: Multiple connections, new ones appearing
- After fix: Single connection that stays open



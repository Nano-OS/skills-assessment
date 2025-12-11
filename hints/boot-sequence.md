# Boot Sequence Hints

## Step 1: Handshake
The token format is: base64(YYYY-MM-DD + "nano-init")

In JavaScript:
const today = new Date().toISOString().split('T')[0]; // "2024-01-15"
const token = btoa(today + "nano-init");

## Step 2: Tenant Verification
The SQL query you need is in the challenge response.
Look for the tenant with status = 'active'.
UUID format matters - copy it exactly.

## Step 3: WebSocket Connection
The HMAC signature uses:
- Secret: webhookSecret from the config
- Message: your sessionKey
- Algorithm: SHA-256
- Output: hex string

Node.js example:
const crypto = require('crypto');
const signature = crypto.createHmac('sha256', webhookSecret)
  .update(sessionKey)
  .digest('hex');



/**
 * Test script for the race condition bug.
 * 
 * Run with: npm run test:budget
 * 
 * Expected behavior after fix:
 *   - Starting budget: 10000
 *   - 5 concurrent deductions of 100 each
 *   - Final budget should be: 9500
 * 
 * Current buggy behavior:
 *   - Final budget is ~9900 (only one deduction applied)
 */

const API_URL = process.env.API_URL || 'http://localhost:3001';
const WORKER_ID = 'a1b2c3d4-0000-0000-0000-000000000001';
const DEDUCTION_AMOUNT = 100;
const CONCURRENT_REQUESTS = 5;

async function resetBudget() {
  await fetch(`${API_URL}/api/workers/${WORKER_ID}/reset-budget`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 10000 }),
  });
}

async function getBudget(): Promise<number> {
  const res = await fetch(`${API_URL}/api/workers/${WORKER_ID}`);
  const data = await res.json();
  return data.token_budget;
}

async function deductTokens(): Promise<void> {
  await fetch(`${API_URL}/api/workers/${WORKER_ID}/deduct-tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: DEDUCTION_AMOUNT }),
  });
}

async function main() {
  console.log('=== Race Condition Test ===\n');
  
  // Reset to known state
  await resetBudget();
  const startingBudget = await getBudget();
  console.log(`Starting budget: ${startingBudget}`);
  console.log(`Firing ${CONCURRENT_REQUESTS} concurrent requests, each deducting ${DEDUCTION_AMOUNT}...\n`);
  
  // Fire concurrent requests
  const promises = Array(CONCURRENT_REQUESTS)
    .fill(null)
    .map(() => deductTokens());
  
  await Promise.all(promises);
  
  // Check result
  const finalBudget = await getBudget();
  const expectedBudget = startingBudget - (CONCURRENT_REQUESTS * DEDUCTION_AMOUNT);
  
  console.log(`Final budget: ${finalBudget}`);
  console.log(`Expected budget: ${expectedBudget}`);
  console.log('');
  
  if (finalBudget === expectedBudget) {
    console.log('✅ PASS: Race condition fixed!');
    process.exit(0);
  } else {
    console.log('❌ FAIL: Race condition detected.');
    console.log(`   Lost ${expectedBudget - finalBudget} tokens due to concurrent updates.`);
    process.exit(1);
  }
}

main().catch(console.error);



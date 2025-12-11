# Bug 2: Race Condition

## The Problem
The deductTokens function does READ then WRITE as separate operations.
With concurrent requests:

Request A: READ budget (10000)
Request B: READ budget (10000)  ← Same stale value!
Request A: WRITE budget (9900)
Request B: WRITE budget (9900)  ← Overwrites A's write!

Result: Only one deduction applied instead of two.

## Solutions (pick one)

### Option 1: Database Transaction with Row Locking
```sql
BEGIN;
SELECT token_budget FROM workers WHERE id = $1 FOR UPDATE;
-- Calculate new budget
UPDATE workers SET token_budget = $1 WHERE id = $2;
COMMIT;
```

### Option 2: Atomic Update
```sql
UPDATE workers 
SET token_budget = token_budget - $1 
WHERE id = $2 
RETURNING token_budget;
```

### Option 3: Optimistic Locking
Add a `version` column. Read it with the budget, increment on write.
If version changed between read and write, retry.

## Recommended
Option 2 (atomic update) is simplest for this case.



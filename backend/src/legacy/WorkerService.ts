import { pool } from '../db/client';

export class WorkerService {
  /**
   * Deduct tokens from a worker's budget.
   * 
   * NOTE: This implementation has a known concurrency issue.
   * See test:budget script to reproduce.
   */
  async deductTokens(workerId: string, amount: number): Promise<{
    previousBudget: number;
    newBudget: number;
  }> {
    // Step 1: Read current budget
    const result = await pool.query(
      'SELECT token_budget FROM workers WHERE id = $1',
      [workerId]
    );
    
    if (result.rows.length === 0) {
      throw new Error(`Worker not found: ${workerId}`);
    }
    
    const previousBudget = result.rows[0].token_budget;
    

    // In production, this could be network latency, other queries, etc.
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Step 2: Calculate and write new budget

    const newBudget = previousBudget - amount;
    
    await pool.query(
      'UPDATE workers SET token_budget = $1 WHERE id = $2',
      [newBudget, workerId]
    );
    
    return { previousBudget, newBudget };
  }

  async getWorker(workerId: string) {
    const result = await pool.query(
      'SELECT * FROM workers WHERE id = $1',
      [workerId]
    );
    return result.rows[0] || null;
  }

  async resetBudget(workerId: string, amount: number = 10000) {
    await pool.query(
      'UPDATE workers SET token_budget = $1 WHERE id = $2',
      [amount, workerId]
    );
  }
}

export const workerService = new WorkerService();



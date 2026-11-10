export interface Expense {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
}

export interface ExpensePayload {
  description: string;
  category: string;
  date: string;
  amount: number;
}
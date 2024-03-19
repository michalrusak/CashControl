import { Finance } from 'src/enums/finance.enum';

export type AddTransactionPayload = {
  type: Finance.expense | Finance.income;
  amount: number;
  category: string;
  description: string;
};

export interface UpdateTransactionPayload
  extends Partial<AddTransactionPayload> {
  id: string;
}

export type AddUserPreferencesPayload = {
  currency: string;
  incomeCategories: string[];
  expenseCategories: string[];
};

export type ResponseUserPreferences = AddUserPreferencesPayload;

export type UpdateUserPreferencesPayload = Partial<AddUserPreferencesPayload>;

export type AddGroupTransactionPayload = {
  transactions_id: string[];
  name: string;
};

export interface UpdateGroupTransactionPayload
  extends Partial<AddGroupTransactionPayload> {
  id: string;
}

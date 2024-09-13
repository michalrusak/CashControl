import { Finance } from 'src/enums/finance.enum';
import {
  array,
  minLength,
  minValue,
  number,
  object,
  optional,
  picklist,
  pipe,
  string,
} from 'valibot';

export const AddTransactionPayloadSchema = object({
  type: picklist([Finance.expense, Finance.income]),
  amount: pipe(number(), minValue(0.1)),
  category: pipe(string(), minLength(1)),
  description: optional(pipe(string(), minLength(1))),
  date: string(),
});

export const UpdateTransactionPayloadSchema = object({
  id: pipe(string(), minLength(1)),
  type: optional(picklist([Finance.expense, Finance.income])),
  amount: optional(pipe(number(), minValue(0.1))),
  category: optional(pipe(string(), minLength(1))),
  description: optional(pipe(string(), minLength(1))),
  date: optional(string()),
});

export const AddUserPreferencesPayloadSchema = object({
  currency: pipe(string(), minLength(1)),
  incomeCategories: array(pipe(string(), minLength(1))),
  expenseCategories: array(pipe(string(), minLength(1))),
});

export const UpdateUserPreferencesPayloadSchema = object({
  currency: optional(pipe(string(), minLength(1))),
  incomeCategories: optional(array(pipe(string(), minLength(1)))),
  expenseCategories: optional(array(pipe(string(), minLength(1)))),
});

export const AddGroupTransactionPayloadSchema = object({
  name: pipe(string(), minLength(1)),
  transactions_id: array(pipe(string(), minLength(1))),
});

export const UpdateGroupTransactionPayloadSchema = object({
  id: pipe(string(), minLength(1)),
  name: optional(pipe(string(), minLength(1))),
  transactions_id: optional(array(pipe(string(), minLength(1)))),
});

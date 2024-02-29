import { Finance } from 'src/enums/finance.enum';
import {
  array,
  minLength,
  minValue,
  number,
  object,
  optional,
  picklist,
  string,
} from 'valibot';

export const AddTransactionPayloadSchema = object({
  type: picklist([Finance.expense, Finance.income]),
  amount: number([minValue(0.1)]),
  category: string([minLength(1)]),
  description: optional(string([minLength(1)])),
});

export const UpdateTransactionPayloadSchema = object({
  id: string([minLength(1)]),
  type: optional(picklist([Finance.expense, Finance.income])),
  amount: optional(number([minValue(0.1)])),
  category: optional(string([minLength(1)])),
  description: optional(string([minLength(1)])),
});

export const AddUserPreferencesPayloadSchema = object({
  currency: string([minLength(1)]),
  incomeCategories: array(string([minLength(1)])),
  expenseCategories: array(string([minLength(1)])),
});

export const UpdateUserPreferencesPayloadSchema = object({
  currency: optional(string([minLength(1)])),
  incomeCategories: optional(array(string([minLength(1)]))),
  expenseCategories: optional(array(string([minLength(1)]))),
});

export const AddGroupTransactionPayloadSchema = object({
  name: string([minLength(1)]),
  transactions_id: array(string([minLength(1)])),
});

export const UpdateGroupTransactionPayloadSchema = object({
  id: string([minLength(1)]),
  name: optional(string([minLength(1)])),
  transactions_id: optional(array(string([minLength(1)]))),
});

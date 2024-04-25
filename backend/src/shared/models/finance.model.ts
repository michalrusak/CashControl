import mongoose from 'mongoose';
import { Database } from 'src/enums/database.enum';
import { Finance } from 'src/enums/finance.enum';

export const TransactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: Database.user },
  type: { type: String, enum: [Finance.expense, Finance.income] },
  amount: Number,
  category: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  description: String,
});

export interface Transaction extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  type: Finance.expense | Finance.income;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export const UserPreferencesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: Database.user },
  currency: String,
  incomeCategories: [String],
  expenseCategories: [String],
});

export interface UserPreferences extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  currency: string;
  incomeCategories: string[];
  expenseCategories: string[];
}

export const GroupTransactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: Database.user },
  transactions_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: Database.transaction },
  ],
  name: String,
});

export interface GroupTransaction extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  transactions_id: mongoose.Types.ObjectId[];
  name: string;
}

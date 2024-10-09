import { LoginPayload, RegisterPayload } from 'src/auth/auth.dto';
import { Finance } from 'src/enums/finance.enum';
import {
  AddGroupTransactionPayload,
  AddTransactionPayload,
  AddUserPreferencesPayload,
  UpdateGroupTransactionPayload,
} from 'src/finance/finance.dto';
import { ChangePasswordPayload, UpdateUserPayload } from 'src/user/user.dto';

interface TransactionResponse {
  id: string;
  user_id: string;
  type: Finance.expense | Finance.income;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

interface TransactionUpdate extends Partial<TransactionResponse> {
  id: string;
}

interface UserPreferencesResponse extends AddUserPreferencesPayload {
  user_id: string;
}

interface GroupTransactionResponse extends AddGroupTransactionPayload {
  user_id: string;
}

export const registerPayload: RegisterPayload = {
  email: 'john@example.com',
  password: '12345678',
  firstName: 'John',
  lastName: 'Doe',
};

export const loginPayload: LoginPayload = {
  email: 'john@example.com',
  password: '12345678',
};

export const userIdCorrect = '60d5ec49b1e9b3f56c6c7f1b';

export const userIdInvalid = 'someInvalidId';

export const mockUser = {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
};

export const updateUserCorrectPayload: UpdateUserPayload = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

export const updateUserInvalidPayload = {
  firstName: '',
};

export const mockUserWithId = {
  ...mockUser,
  _id: userIdCorrect,
};

export const changePasswordPayloadInavlid: ChangePasswordPayload = {
  currentPassword: 'wrong_password',
  newPassword: 'new_password',
};

export const changePasswordPayloadCorrect: ChangePasswordPayload = {
  currentPassword: 'correct_password',
  newPassword: 'new_password',
};

export const changePasswordEmptyPayload = {};

export const transactionIdOneCorrect = '60d5ec49b1e9b3f56c6c7f1c';

export const transactionIdTwoCorrect = '60d5ec49b1e9b3f56c6c7f1c';

export const groupTransactionIdCorrect = '60d5ec49b1e9b3f56c6c7f1d';

export const mockTransactionToCreate: AddTransactionPayload = {
  type: Finance.income,
  amount: 15,
  category: 'Food',
  date: new Date('2024-01-01').toISOString(),
  description: 'Grocery shopping',
};
export const mockTransaction: TransactionResponse = {
  id: transactionIdOneCorrect,
  user_id: userIdCorrect,
  type: Finance.expense,
  amount: 100.0,
  category: 'Food',
  date: new Date('2024-01-01'),
  createdAt: new Date(),
  updatedAt: null,
  description: 'Grocery shopping',
};

export const mockTransactionTwo: TransactionResponse = {
  id: transactionIdTwoCorrect,
  user_id: userIdCorrect,
  type: Finance.expense,
  amount: 20.0,
  category: 'Food',
  date: new Date('2024-01-01'),
  createdAt: new Date(),
  updatedAt: null,
  description: 'Grocery shopping',
};

export const mockTransactionsArray: TransactionResponse[] = [
  mockTransaction,
  mockTransactionTwo,
];

export const mockTransactionToUpdate: TransactionUpdate = {
  id: transactionIdOneCorrect,
  amount: 200.0,
  updatedAt: new Date(),
};

export const mockUserPreferences: UserPreferencesResponse = {
  user_id: userIdCorrect,
  currency: 'USD',
  incomeCategories: ['Salary', 'Freelance'],
  expenseCategories: ['Food', 'Transport'],
};

export const mockGroupTransactionsArray: GroupTransactionResponse = {
  user_id: userIdCorrect,
  transactions_id: [transactionIdOneCorrect, transactionIdTwoCorrect],
  name: 'Monthly Budget',
};

export const mockGroupTransactionToUpdate: UpdateGroupTransactionPayload = {
  id: groupTransactionIdCorrect,
  name: 'Monthly Budget',
};

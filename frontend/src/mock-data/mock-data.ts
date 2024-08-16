import {
  LoginData,
  RegisterData,
  ResponseUser,
} from 'src/app/modules/core/models/auth.model';
import {
  Categories,
  UserPreferences,
} from 'src/app/modules/core/models/preferences.model';
import { MessageResponse } from 'src/app/modules/core/models/response.model';
import {
  AddTransaction,
  AllTransactionsResponse,
  DetailsTransaction,
  Finance,
  UpdateTransactionPayload,
} from 'src/app/modules/core/models/transaction.model';
import {
  ChangePasswordPayload,
  UpdateUserPayload,
  User,
} from 'src/app/modules/core/models/user.model';

export const mockRegisterBody: RegisterData = {
  email: 'test1@mail.com',
  firstName: 'test',
  lastName: 'test',
  password: '12345678',
};

export const mockRegisterMessageResponse: MessageResponse = {
  message: 'User registered successfully',
};
export const mockLogoutMessageResponse: MessageResponse = {
  message: 'User logout successfully',
};

export const mockErrorMessage = 'Invalid credentials';

export const mockLoginBody: LoginData = {
  email: 'test1@mail.com',
  password: '12345678',
};

export const mockUser: User = {
  email: 'test1@mail.com',
  firstName: 'test',
  lastName: 'test',
};

export const mockResponseUser: ResponseUser = {
  user: mockUser,
};

export const mockCategories: Categories = [
  'Salary',
  'Freelance',
  'Gifts',
  'Other',
];

export const mockUserPreferences: UserPreferences = {
  currency: 'USD',
  expenseCategories: mockCategories,
  incomeCategories: mockCategories,
};

export const mockTransaction: DetailsTransaction = {
  _id: '123',
  user_id: '123',
  type: Finance.expense,
  amount: 100,
  category: 'food',
  date: '2023-01-01',
  description: 'Grocery shopping',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z'),
};

export const mockAllTransactions: AllTransactionsResponse = {
  count: 5,
  transactions: new Array(5).fill(mockTransaction),
};

export const mockAddTransaction: AddTransaction = {
  type: Finance.expense,
  amount: 100,
  category: 'food',
  date: '2023-01-01',
  description: 'Grocery shopping',
};

export const mockUpdateTransaction: UpdateTransactionPayload = {
  id: '123',
  type: Finance.expense,
  amount: 100,
  category: 'food',
};

export const deleteTransactionMessageResponse: MessageResponse = {
  message: 'Transaction deleted successfully',
};

export const errorMessageNotFound = 'Not Found';

export const deleteAccountMessageResponse: MessageResponse = {
  message: 'Account delete successfully',
};

export const changePasswordtMessageResponse: MessageResponse = {
  message: 'Change password successfully',
};

export const updateUserMessageResponse: MessageResponse = {
  message: 'Update user successfully',
};

export const updateUser: UpdateUserPayload = {
  email: 'test1@mail.com',
  firstName: 'test',
  lastName: 'test',
};

export const changePasswordPayload: ChangePasswordPayload = {
  currentPassword: '12345678',
  newPassword: '123456789',
};

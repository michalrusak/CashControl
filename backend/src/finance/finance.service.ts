import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Database } from 'src/enums/database.enum';
import { safeParse } from 'valibot';
import {
  GroupTransaction,
  Transaction,
  UserPreferences,
} from '../shared/models/finance.model';
import {
  AddGroupTransactionPayload,
  AddTransactionPayload,
  AddUserPreferencesPayload,
  ResponseUserPreferences,
  UpdateGroupTransactionPayload,
  UpdateTransactionPayload,
  UpdateUserPreferencesPayload,
} from './finance.dto';
import {
  AddGroupTransactionPayloadSchema,
  AddTransactionPayloadSchema,
  AddUserPreferencesPayloadSchema,
  UpdateGroupTransactionPayloadSchema,
  UpdateTransactionPayloadSchema,
  UpdateUserPreferencesPayloadSchema,
} from './finance.schema';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Database.transaction)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(Database.userPreferences)
    private readonly userPreferencesModel: Model<UserPreferences>,
    @InjectModel(Database.groupTransaction)
    private readonly groupTransactionModel: Model<GroupTransaction>,
  ) {}

  private defaultIncomeCategories = ['Salary', 'Sale', 'Rent', 'Benefit'];
  private defaultExpenseCategories = [
    'Food',
    'Bills',
    'House',
    'Fuel',
    'Transport',
  ];
  private defaultCurrency = ['PLN', 'USD', 'EURO'];

  async findTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return transaction;
  }

  async findAllUserTransactions(
    userId: string,
    fromDate?: Date,
    toDate?: Date,
    page = 1,
    limit = 10,
    type?: string,
    minAmount?: number,
    maxAmount?: number,
    category?: string,
  ): Promise<{ transactions: Transaction[]; count: number }> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const query: any = { user_id: userId };

    if (fromDate && toDate) {
      query.date = { $gte: fromDate, $lte: toDate };
    }

    if (type) {
      query.type = type;
    }

    if (minAmount !== undefined && maxAmount !== undefined) {
      query.amount = { $gte: minAmount, $lte: maxAmount };
    } else if (minAmount !== undefined) {
      query.amount = { $gte: minAmount };
    } else if (maxAmount !== undefined) {
      query.amount = { $lte: maxAmount };
    }

    if (category) {
      query.category = category;
    }

    const offset = (page - 1) * limit;

    const transactions = await this.transactionModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .exec();

    const countElements = await this.transactionModel.countDocuments(query);

    return { transactions, count: countElements };
  }

  async createTransaction(
    userId: string,
    addTransactionPayload: AddTransactionPayload,
  ): Promise<Transaction> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const result = safeParse(
      AddTransactionPayloadSchema,
      addTransactionPayload,
    );

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const newTransaction = new this.transactionModel({
      user_id: userId,
      type: addTransactionPayload.type,
      amount: addTransactionPayload.amount,
      category: addTransactionPayload.category,
      description: addTransactionPayload.description,
      date: addTransactionPayload.date,
      createdAt: new Date(),
    });
    return await newTransaction.save();
  }

  async updateTransaction(
    updateTransactionPayload: UpdateTransactionPayload,
  ): Promise<Transaction> {
    const result = safeParse(
      UpdateTransactionPayloadSchema,
      updateTransactionPayload,
    );

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const existingTransaction = await this.transactionModel.findOne({
      _id: updateTransactionPayload.id,
    });

    if (!existingTransaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    if (updateTransactionPayload.amount) {
      existingTransaction.amount = updateTransactionPayload.amount;
    }

    if (updateTransactionPayload.category) {
      existingTransaction.category = updateTransactionPayload.category;
    }

    if (updateTransactionPayload.description) {
      existingTransaction.description = updateTransactionPayload.description;
    }

    if (updateTransactionPayload.type) {
      existingTransaction.type = updateTransactionPayload.type;
    }

    if (updateTransactionPayload.date) {
      existingTransaction.date = updateTransactionPayload.date;
    }

    existingTransaction.updatedAt = new Date();

    return await existingTransaction.save();
  }

  async deleteTransaction(id_transaction: string) {
    if (!id_transaction) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const existingTransaction = await this.transactionModel.findOneAndDelete({
      _id: id_transaction,
    });

    if (!existingTransaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
  }

  getDefaultIncomeCategories() {
    return this.defaultIncomeCategories;
  }

  getDefaultExpenseCategories() {
    return this.defaultExpenseCategories;
  }

  async getDefaultCurrency() {
    return this.defaultCurrency;
  }

  async getUserPreferences(userId: string): Promise<ResponseUserPreferences> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const query: any = { user_id: userId };
    const userPreferences = await this.userPreferencesModel
      .findOne(query)
      .exec();

    if (!userPreferences) {
      return null;
    }
    return {
      currency: userPreferences.currency,
      incomeCategories: userPreferences.incomeCategories,
      expenseCategories: userPreferences.expenseCategories,
    };
  }

  async addUserPreferences(
    userId: string,
    addUserPreferencesPayload: AddUserPreferencesPayload,
  ): Promise<UserPreferences> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const result = safeParse(
      AddUserPreferencesPayloadSchema,
      addUserPreferencesPayload,
    );

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const newUserPreferences = new this.userPreferencesModel({
      user_id: userId,
      currency: addUserPreferencesPayload.currency,
      incomeCategories: addUserPreferencesPayload.incomeCategories,
      expenseCategories: addUserPreferencesPayload.expenseCategories,
    });
    return await newUserPreferences.save();
  }

  async updateUserPreferences(
    userId: string,
    updateUserPreferencesPayload: UpdateUserPreferencesPayload,
  ): Promise<UserPreferences> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const result = safeParse(
      UpdateUserPreferencesPayloadSchema,
      updateUserPreferencesPayload,
    );

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const existingUserPreferences = await this.userPreferencesModel.findOne({
      user_id: userId,
    });

    if (!existingUserPreferences) {
      throw new HttpException(
        'User preferences not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateUserPreferencesPayload.currency) {
      existingUserPreferences.currency = updateUserPreferencesPayload.currency;
    }

    if (updateUserPreferencesPayload.incomeCategories) {
      existingUserPreferences.incomeCategories =
        updateUserPreferencesPayload.incomeCategories;
    }

    if (updateUserPreferencesPayload.expenseCategories) {
      existingUserPreferences.expenseCategories =
        updateUserPreferencesPayload.expenseCategories;
    }

    return await existingUserPreferences.save();
  }

  async getGroupTransaction(userId: string): Promise<GroupTransaction[]> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const query: any = { user_id: userId };

    return await this.groupTransactionModel.find(query).exec();
  }

  async addGroupTransaction(
    userId: string,
    addGroupTransactionPayload: AddGroupTransactionPayload,
  ): Promise<GroupTransaction> {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const result = safeParse(
      AddGroupTransactionPayloadSchema,
      addGroupTransactionPayload,
    );

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const newGroupTransaction = new this.groupTransactionModel({
      user_id: userId,
      name: addGroupTransactionPayload.name,
      transactions_id: addGroupTransactionPayload.transactions_id,
    });
    return await newGroupTransaction.save();
  }

  async updateGroupTransaction(
    updateGroupTransactionPayload: UpdateGroupTransactionPayload,
  ): Promise<GroupTransaction> {
    const result = safeParse(
      UpdateGroupTransactionPayloadSchema,
      updateGroupTransactionPayload,
    );

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const existingGroupTransaction = await this.groupTransactionModel.findOne({
      _id: updateGroupTransactionPayload.id,
    });

    if (!existingGroupTransaction) {
      throw new HttpException(
        'Group transaction not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateGroupTransactionPayload.name) {
      existingGroupTransaction.name = updateGroupTransactionPayload.name;
    }

    if (updateGroupTransactionPayload.transactions_id) {
      existingGroupTransaction.transactions_id =
        existingGroupTransaction.transactions_id;
    }

    return await existingGroupTransaction.save();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  Transaction,
  UserPreferences,
  GroupTransaction,
} from '../shared/models/finance.model';
import { Database } from 'src/enums/database.enum';
import {
  mockTransaction,
  mockTransactionToCreate,
  transactionIdOneCorrect,
  mockTransactionsArray,
  userIdCorrect,
} from 'src/mock-data/mockData';

const mockTransactionModel = {
  findById: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  findOneAndDelete: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
  countDocuments: jest.fn(),
};

const mockUserPreferencesModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
};

const mockGroupTransactionModel = {
  find: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
};

describe('FinanceService', () => {
  let service: FinanceService;
  let transactionModel: Model<Transaction>;
  let userPreferencesModel: Model<UserPreferences>;
  let groupTransactionModel: Model<GroupTransaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        {
          provide: getModelToken(Database.transaction),
          useValue: mockTransactionModel,
        },
        {
          provide: getModelToken(Database.userPreferences),
          useValue: mockUserPreferencesModel,
        },
        {
          provide: getModelToken(Database.groupTransaction),
          useValue: mockGroupTransactionModel,
        },
      ],
    }).compile();

    service = module.get<FinanceService>(FinanceService);
    transactionModel = module.get<Model<Transaction>>(
      getModelToken(Database.transaction),
    );
    userPreferencesModel = module.get<Model<UserPreferences>>(
      getModelToken(Database.userPreferences),
    );
    groupTransactionModel = module.get<Model<GroupTransaction>>(
      getModelToken(Database.groupTransaction),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockTransactionWithSave = {
    ...mockTransactionToCreate,
    save: jest.fn().mockResolvedValue(mockTransactionToCreate),
  };

  describe('findTransactionById', () => {
    it('should return a transaction if it exists', async () => {
      (transactionModel.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTransaction),
      });

      const result = await service.findTransactionById('123');
      expect(result).toEqual(mockTransaction);
      expect(transactionModel.findById).toHaveBeenCalledWith('123');
    });

    it('should throw an error if transaction is not found', async () => {
      (transactionModel.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findTransactionById('123')).rejects.toThrow(
        new HttpException('Transaction not found', 404),
      );
    });
  });

  describe('createTransaction', () => {
    it('should create and return a new transaction', async () => {
      (transactionModel.create as jest.Mock).mockResolvedValue(
        mockTransactionWithSave,
      );

      const result = await service.createTransaction(
        userIdCorrect,
        mockTransactionToCreate,
      );
      expect(result).toEqual(mockTransactionToCreate);
      expect(transactionModel.create).toHaveBeenCalledWith({
        user_id: userIdCorrect,
        type: mockTransactionToCreate.type,
        amount: mockTransactionToCreate.amount,
        category: mockTransactionToCreate.category,
        description: mockTransactionToCreate.description,
        date: new Date(mockTransactionToCreate.date),
        createdAt: expect.any(Date),
      });
    });
  });

  describe('findAllUserTransactions', () => {
    it('should return all transactions for a user with filters', async () => {
      (transactionModel.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockTransactionsArray),
      });

      (transactionModel.countDocuments as jest.Mock).mockResolvedValue(2);

      const result = await service.findAllUserTransactions(userIdCorrect);
      expect(result.transactions).toEqual(mockTransactionsArray);
      expect(result.count).toBe(2);
      expect(transactionModel.find).toHaveBeenCalledWith({
        user_id: userIdCorrect,
      });
    });
  });

  describe('deleteTransaction', () => {
    it('should delete a transaction successfully', async () => {
      (transactionModel.findOneAndDelete as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          _id: transactionIdOneCorrect,
        }),
      });

      await service.deleteTransaction(transactionIdOneCorrect);
      expect(transactionModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: transactionIdOneCorrect,
      });
    });

    it('should throw an error if transaction is not found', async () => {
      (transactionModel.findOneAndDelete as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      try {
        await service.deleteTransaction('invalidId');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Transaction not found');
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});

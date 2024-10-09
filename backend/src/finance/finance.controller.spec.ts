import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import {
  mockGroupTransactionsArray,
  mockGroupTransactionToUpdate,
  mockTransaction,
  mockTransactionsArray,
  mockTransactionToUpdate,
  mockUserPreferences,
} from 'src/mock-data/mockData';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

describe('FinanceController', () => {
  let financeController: FinanceController;
  let financeService: FinanceService;

  const mockFinanceService = {
    findTransactionById: jest.fn(),
    findAllUserTransactions: jest.fn(),
    createTransaction: jest.fn(),
    updateTransaction: jest.fn(),
    deleteTransaction: jest.fn(),
    getUserPreferences: jest.fn(),
    addUserPreferences: jest.fn(),
    getDefaultExpenseCategories: jest.fn(),
    getDefaultIncomeCategories: jest.fn(),
    getDefaultCurrency: jest.fn(),
    getGroupTransaction: jest.fn(),
    addGroupTransaction: jest.fn(),
    updateGroupTransaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceController],
      providers: [
        {
          provide: FinanceService,
          useValue: mockFinanceService,
        },
      ],
    }).compile();

    financeController = module.get<FinanceController>(FinanceController);
    financeService = module.get<FinanceService>(FinanceService);
  });

  describe('findTransactionById', () => {
    it('should return a transaction by ID', async () => {
      mockFinanceService.findTransactionById.mockResolvedValueOnce(
        mockTransaction,
      );
      const result = await financeController.findTransactionById('some-id');
      expect(result).toEqual(mockTransaction);
      expect(mockFinanceService.findTransactionById).toHaveBeenCalledWith(
        'some-id',
      );
    });

    it('should throw an error if transaction not found', async () => {
      mockFinanceService.findTransactionById.mockRejectedValueOnce(
        new HttpException('Transaction not found', HttpStatus.NOT_FOUND),
      );
      await expect(
        financeController.findTransactionById('some-id'),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('findAllUserTransactions', () => {
    it('should return all user transactions', async () => {
      mockFinanceService.findAllUserTransactions.mockResolvedValueOnce(
        mockTransactionsArray,
      );
      const req = { user: 'some-user-id' };
      const result = await financeController.findAllUserTransactions(
        req,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      );
      expect(result).toEqual(mockTransactionsArray);
    });
  });

  describe('createTransaction', () => {
    it('should create a new transaction', async () => {
      mockFinanceService.createTransaction.mockResolvedValueOnce(
        mockTransaction,
      );
      const req = { user: 'some-user-id' };
      const result = await financeController.createTransaction(
        req,
        mockTransaction,
      );
      expect(result).toEqual(mockTransaction);
    });

    it('should throw an error if invalid credentials', async () => {
      mockFinanceService.createTransaction.mockRejectedValueOnce(
        new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST),
      );
      const req = { user: 'some-user-id' };
      await expect(
        financeController.createTransaction(req, mockTransaction),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('updateTransaction', () => {
    it('should update an existing transaction', async () => {
      mockFinanceService.updateTransaction.mockResolvedValueOnce(
        mockTransactionToUpdate,
      );
      const result = await financeController.updateTransaction(
        mockTransactionToUpdate,
      );
      expect(result).toEqual(mockTransactionToUpdate);
    });

    it('should throw an error if transaction not found', async () => {
      mockFinanceService.updateTransaction.mockRejectedValueOnce(
        new HttpException('Transaction not found', HttpStatus.NOT_FOUND),
      );
      await expect(
        financeController.updateTransaction(mockTransactionToUpdate),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('deleteTransaction', () => {
    it('should delete a transaction by ID', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      mockFinanceService.deleteTransaction.mockResolvedValueOnce(undefined);
      await financeController.deleteTransaction('some-id', res);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Transaction deleted successfully',
      });
    });

    it('should throw an error if transaction not found', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      mockFinanceService.deleteTransaction.mockRejectedValueOnce(
        new HttpException('Transaction not found', HttpStatus.NOT_FOUND),
      );
      await expect(
        financeController.deleteTransaction('some-id', res),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('getUserPreferences', () => {
    it('should return user preferences', async () => {
      const req = { user: 'some-user-id' };
      mockFinanceService.getUserPreferences.mockResolvedValueOnce(
        mockUserPreferences,
      );
      const result = await financeController.getUserPreferences(req);
      expect(result).toEqual(mockUserPreferences);
    });
  });

  describe('addUserPreferences', () => {
    it('should add new user preferences', async () => {
      const req = { user: 'some-user-id' };
      mockFinanceService.addUserPreferences.mockResolvedValueOnce(
        mockUserPreferences,
      );
      const result = await financeController.addUserPreferences(
        req,
        mockUserPreferences,
      );
      expect(result).toEqual(mockUserPreferences);
    });
  });

  describe('getGroupTransaction', () => {
    it('should return group transactions for a user', async () => {
      const req = { user: 'some-user-id' };
      mockFinanceService.getGroupTransaction.mockResolvedValueOnce(
        mockGroupTransactionsArray,
      );
      const result = await financeController.getGroupTransaction(req);
      expect(result).toEqual(mockGroupTransactionsArray);
    });
  });

  describe('addGroupTransaction', () => {
    it('should add a new group transaction', async () => {
      const req = { user: 'some-user-id' };
      mockFinanceService.addGroupTransaction.mockResolvedValueOnce(
        mockGroupTransactionsArray,
      );
      const result = await financeController.addGroupTransaction(
        req,
        mockGroupTransactionsArray,
      );
      expect(result).toEqual(mockGroupTransactionsArray);
    });
  });

  describe('updateGroupTransaction', () => {
    it('should update an existing group transaction', async () => {
      mockFinanceService.updateGroupTransaction.mockResolvedValueOnce(
        mockGroupTransactionToUpdate,
      );
      const result = await financeController.updateGroupTransaction(
        mockGroupTransactionToUpdate,
      );
      expect(result).toEqual(mockGroupTransactionToUpdate);
    });
  });
});

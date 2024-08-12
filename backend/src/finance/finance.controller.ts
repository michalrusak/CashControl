import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { EndPoints } from '../enums/endpoints.enum';
import { FinanceService } from './finance.service';
import {
  AddGroupTransactionPayload,
  AddTransactionPayload,
  AddUserPreferencesPayload,
  UpdateGroupTransactionPayload,
  UpdateTransactionPayload,
  UpdateUserPreferencesPayload,
} from './finance.dto';
import { Queries } from '../enums/query.enum';
import { Transaction } from '../shared/models/finance.model';
import { Response } from 'express';

@Controller(EndPoints.finance)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get(`${EndPoints.transaction}/:id`)
  async findTransactionById(@Param('id') id: string): Promise<Transaction> {
    return await this.financeService.findTransactionById(id);
  }

  @Get(EndPoints.transaction)
  async findAllUserTransactions(
    @Req() req,
    @Query(Queries.fromDate) fromDate: Date,
    @Query(Queries.toDate) toDate: Date,
    @Query(Queries.page) page: number,
    @Query(Queries.limit) limit: number,
    @Query(Queries.type) type: string,
    @Query(Queries.minAmount) minAmount: number,
    @Query(Queries.maxAmount) maxAmount: number,
    @Query(Queries.category) category: string,
  ) {
    const userId = req.user;

    return await this.financeService.findAllUserTransactions(
      userId,
      fromDate,
      toDate,
      page,
      limit,
      type,
      minAmount,
      maxAmount,
      category,
    );
  }

  @Post(EndPoints.transaction)
  async createTransaction(@Req() req, @Body() payload: AddTransactionPayload) {
    const userId = req.user;
    return await this.financeService.createTransaction(userId, payload);
  }

  @Patch(EndPoints.transaction)
  async updateTransaction(@Body() payload: UpdateTransactionPayload) {
    return await this.financeService.updateTransaction(payload);
  }

  @Delete(`${EndPoints.transaction}/:id`)
  async deleteTransaction(@Param('id') id: string, @Res() res: Response) {
    await this.financeService.deleteTransaction(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Transaction deleted successfully' });
  }

  @Get(EndPoints.getDefaultExpenseCategories)
  getDefaultExpenseCategories() {
    return this.financeService.getDefaultExpenseCategories();
  }

  @Get(EndPoints.getDefaultIncomeCategories)
  getDefaultIncomeCategories() {
    return this.financeService.getDefaultIncomeCategories();
  }

  @Get(EndPoints.getDefaultCurrency)
  getDefaultCurrency() {
    return this.financeService.getDefaultCurrency();
  }

  @Get(EndPoints.userPreferences)
  getUserPreferences(@Req() req) {
    const userId = req.user;
    return this.financeService.getUserPreferences(userId);
  }

  @Post(EndPoints.userPreferences)
  async addUserPreferences(
    @Req() req,
    @Body() payload: AddUserPreferencesPayload,
  ) {
    const userId = req.user;
    return await this.financeService.addUserPreferences(userId, payload);
  }

  @Patch(EndPoints.userPreferences)
  async updateUserPreferences(
    @Req() req,
    @Body() payload: UpdateUserPreferencesPayload,
  ) {
    const userId = req.user;
    return await this.financeService.updateUserPreferences(userId, payload);
  }

  @Get(EndPoints.groupTransaction)
  getGroupTransaction(@Req() req) {
    const userId = req.user;
    return this.financeService.getGroupTransaction(userId);
  }

  @Post(EndPoints.groupTransaction)
  async addGroupTransaction(
    @Req() req,
    @Body() payload: AddGroupTransactionPayload,
  ) {
    const userId = req.user;
    return await this.financeService.addGroupTransaction(userId, payload);
  }

  @Patch(EndPoints.groupTransaction)
  async updateGroupTransaction(@Body() payload: UpdateGroupTransactionPayload) {
    return await this.financeService.updateGroupTransaction(payload);
  }
}

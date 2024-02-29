import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { EndPoints } from 'src/enums/endPoints.enum';
import { FinanceService } from './finance.service';
import {
  AddGroupTransactionPayload,
  AddTransactionPayload,
  AddUserPreferencesPayload,
  UpdateGroupTransactionPayload,
  UpdateTransactionPayload,
  UpdateUserPreferencesPayload,
} from './finance.dto';
import { Queries } from 'src/enums/query.enum';

@Controller(EndPoints.finance)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}
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
  async createTransaction(@Req() req, @Body() payLoad: AddTransactionPayload) {
    const userId = req.user;
    return await this.financeService.createTransaction(userId, payLoad);
  }

  @Patch(EndPoints.transaction)
  async updateTransaction(@Body() payLoad: UpdateTransactionPayload) {
    return await this.financeService.updateTransaction(payLoad);
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
    @Body() payLoad: AddUserPreferencesPayload,
  ) {
    const userId = req.user;
    return await this.financeService.addUserPreferences(userId, payLoad);
  }

  @Patch(EndPoints.userPreferences)
  async updateUserPreferences(
    @Req() req,
    @Body() payLoad: UpdateUserPreferencesPayload,
  ) {
    const userId = req.user;
    return await this.financeService.updateUserPreferences(userId, payLoad);
  }

  @Get(EndPoints.groupTransaction)
  getGroupTransaction(@Req() req) {
    const userId = req.user;
    return this.financeService.getGroupTransaction(userId);
  }

  @Post(EndPoints.groupTransaction)
  async addGroupTransaction(
    @Req() req,
    @Body() payLoad: AddGroupTransactionPayload,
  ) {
    const userId = req.user;
    return await this.financeService.addGroupTransaction(userId, payLoad);
  }

  @Patch(EndPoints.groupTransaction)
  async updateGroupTransaction(@Body() payLoad: UpdateGroupTransactionPayload) {
    return await this.financeService.updateGroupTransaction(payLoad);
  }
}

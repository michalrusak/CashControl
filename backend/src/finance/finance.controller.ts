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
import { Transaction } from 'src/shared/models/finance.model';
import { Response } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Finance } from 'src/enums/finance.enum';

@Controller(EndPoints.finance)
@ApiTags(EndPoints.finance)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get(`${EndPoints.transaction}/:id`)
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the transaction',
    example: '5f74d2b4b9b8c45678901234',
  })
  @ApiResponse({ status: 200, description: 'The transaction was found.' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  async findTransactionById(@Param('id') id: string): Promise<Transaction> {
    return await this.financeService.findTransactionById(id);
  }

  @Get(EndPoints.transaction)
  @ApiOperation({
    summary:
      'Get all user transactions within a specific date range and filter criteria',
  })
  @ApiQuery({
    name: Queries.fromDate,
    required: false,
    description: 'Filter transactions from this date (inclusive)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: Queries.toDate,
    required: false,
    description: 'Filter transactions up to this date (inclusive)',
    example: '2024-09-18',
  })
  @ApiQuery({
    name: Queries.page,
    required: false,
    description: 'Pagination page number',
    example: 1,
  })
  @ApiQuery({
    name: Queries.limit,
    required: false,
    description: 'Number of transactions per page',
    example: 10,
  })
  @ApiQuery({
    name: Queries.type,
    required: false,
    description: 'Transaction type (expense or income)',
    example: Finance.expense,
  })
  @ApiQuery({
    name: Queries.minAmount,
    required: false,
    description: 'Minimum transaction amount to filter',
    example: 10.0,
  })
  @ApiQuery({
    name: Queries.maxAmount,
    required: false,
    description: 'Maximum transaction amount to filter',
    example: 100.0,
  })
  @ApiQuery({
    name: Queries.category,
    required: false,
    description: 'Filter transactions by category',
    example: 'Food & Beverages',
  })
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
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({
    type: AddTransactionPayload,
    description: 'Payload to create a new transaction',
  })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  async createTransaction(@Req() req, @Body() payload: AddTransactionPayload) {
    const userId = req.user;
    return await this.financeService.createTransaction(userId, payload);
  }

  @Patch(EndPoints.transaction)
  @ApiOperation({ summary: 'Update an existing transaction' })
  @ApiBody({
    type: UpdateTransactionPayload,
    description: 'Payload to update an existing transaction',
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async updateTransaction(@Body() payload: UpdateTransactionPayload) {
    return await this.financeService.updateTransaction(payload);
  }

  @Delete(`${EndPoints.transaction}/:id`)
  @ApiOperation({ summary: 'Delete a transaction by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the transaction to delete',
    example: '5f74d2b4b9b8c45678901234',
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  async deleteTransaction(@Param('id') id: string, @Res() res: Response) {
    await this.financeService.deleteTransaction(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Transaction deleted successfully' });
  }

  @Get(EndPoints.getDefaultExpenseCategories)
  @ApiOperation({ summary: 'Get the default expense categories' })
  @ApiResponse({
    status: 200,
    description: 'List of default expense categories.',
  })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  getDefaultExpenseCategories() {
    return this.financeService.getDefaultExpenseCategories();
  }

  @Get(EndPoints.getDefaultIncomeCategories)
  @ApiOperation({ summary: 'Get the default income categories' })
  @ApiResponse({
    status: 200,
    description: 'List of default income categories.',
  })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  getDefaultIncomeCategories() {
    return this.financeService.getDefaultIncomeCategories();
  }

  @Get(EndPoints.getDefaultCurrency)
  @ApiOperation({ summary: 'Get the default currency' })
  @ApiResponse({ status: 200, description: 'Default currency.' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  getDefaultCurrency() {
    return this.financeService.getDefaultCurrency();
  }

  @Get(EndPoints.userPreferences)
  @ApiOperation({ summary: 'Get user preferences' })
  @ApiResponse({ status: 200, description: 'User preferences data.' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  getUserPreferences(@Req() req) {
    const userId = req.user;
    return this.financeService.getUserPreferences(userId);
  }

  @Post(EndPoints.userPreferences)
  @ApiOperation({ summary: 'Add new user preferences' })
  @ApiBody({
    type: AddUserPreferencesPayload,
    description: 'Payload to add new user preferences',
  })
  @ApiResponse({
    status: 201,
    description: 'User preferences added successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  async addUserPreferences(
    @Req() req,
    @Body() payload: AddUserPreferencesPayload,
  ) {
    const userId = req.user;
    return await this.financeService.addUserPreferences(userId, payload);
  }

  @Patch(EndPoints.userPreferences)
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiBody({
    type: UpdateUserPreferencesPayload,
    description: 'Payload to update user preferences',
  })
  @ApiResponse({
    status: 200,
    description: 'User preferences updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  async updateUserPreferences(
    @Req() req,
    @Body() payload: UpdateUserPreferencesPayload,
  ) {
    const userId = req.user;
    return await this.financeService.updateUserPreferences(userId, payload);
  }

  @Get(EndPoints.groupTransaction)
  @ApiOperation({ summary: 'Get group transactions for a user' })
  @ApiResponse({ status: 200, description: 'List of group transactions.' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  getGroupTransaction(@Req() req) {
    const userId = req.user;
    return this.financeService.getGroupTransaction(userId);
  }

  @Post(EndPoints.groupTransaction)
  @ApiOperation({ summary: 'Add a new group transaction' })
  @ApiBody({
    type: AddGroupTransactionPayload,
    description: 'Payload to add a new group transaction',
  })
  @ApiResponse({
    status: 201,
    description: 'Group transaction added successfully.',
  })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  async addGroupTransaction(
    @Req() req,
    @Body() payload: AddGroupTransactionPayload,
  ) {
    const userId = req.user;
    return await this.financeService.addGroupTransaction(userId, payload);
  }

  @Patch(EndPoints.groupTransaction)
  @ApiOperation({ summary: 'Update an existing group transaction' })
  @ApiBody({
    type: UpdateGroupTransactionPayload,
    description: 'Payload to update an existing group transaction',
  })
  @ApiResponse({
    status: 200,
    description: 'Group transaction updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  async updateGroupTransaction(@Body() payload: UpdateGroupTransactionPayload) {
    return await this.financeService.updateGroupTransaction(payload);
  }
}

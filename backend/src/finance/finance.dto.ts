import { Finance } from 'src/enums/finance.enum';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class AddTransactionPayload {
  @ApiProperty({
    description: 'Type of the transaction (expense or income)',
    example: 'expense',
  })
  type: Finance;

  @ApiProperty({
    description: 'Amount of the transaction',
    example: 100.5,
  })
  amount: number;

  @ApiProperty({
    description: 'Category of the transaction',
    example: 'Food & Beverages',
  })
  category: string;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Lunch at a restaurant',
  })
  description: string;

  @ApiProperty({
    description: 'Date of the transaction',
    example: '2024-09-18T14:30:00.000Z',
  })
  date: Date | string;
}

export class UpdateTransactionPayload extends PartialType(
  AddTransactionPayload,
) {
  @ApiProperty({
    description: 'ID of the transaction',
    example: '5f74d2b4b9b8c45678901234',
  })
  id: string;
}

export class AddUserPreferencesPayload {
  @ApiProperty({
    description: 'Preferred currency',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    description: 'List of user-defined income categories',
    example: ['Salary', 'Freelancing'],
  })
  incomeCategories: string[];

  @ApiProperty({
    description: 'List of user-defined expense categories',
    example: ['Food', 'Transport'],
  })
  expenseCategories: string[];
}

export class ResponseUserPreferences extends AddUserPreferencesPayload {}

export class UpdateUserPreferencesPayload extends PartialType(
  AddUserPreferencesPayload,
) {}

export class AddGroupTransactionPayload {
  @ApiProperty({
    description: 'Array of transaction IDs',
    example: ['5f74d2b4b9b8c45678901234', '5f74d2b4b9b8c45678905678'],
  })
  transactions_id: string[];

  @ApiProperty({
    description: 'Name of the group transaction',
    example: 'Monthly Expenses',
  })
  name: string;
}

export class UpdateGroupTransactionPayload extends PartialType(
  AddGroupTransactionPayload,
) {
  @ApiProperty({
    description: 'ID of the group transaction',
    example: '5f74d2b4b9b8c45678901234',
  })
  id: string;
}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Database } from 'src/enums/database.enum';
import {
  GroupTransactionSchema,
  TransactionSchema,
  UserPreferencesSchema,
} from '../shared/models/finance.model';
import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';
import { EndPoints } from 'src/enums/endPoints.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Database.transaction, schema: TransactionSchema },
      { name: Database.userPreferences, schema: UserPreferencesSchema },
      { name: Database.groupTransaction, schema: GroupTransactionSchema },
    ]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: `${EndPoints.finance}*`, method: RequestMethod.ALL });
  }
}

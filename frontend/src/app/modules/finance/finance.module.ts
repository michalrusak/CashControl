import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';
import { FinanceRoutingModule } from './finance-routing.module';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { TransacationsTableComponent } from './components/transactions-table/transactions-table.component';
import { DeleteTransactionComponent } from './components/delete-transaction/delete-transaction.component';
import { DataTransferComponent } from './components/data-transfer/data-transfer.component';

@NgModule({
  declarations: [
    TransacationsTableComponent,
    AddTransactionComponent,
    DetailTransactionComponent,
    EditTransactionComponent,
    DeleteTransactionComponent,
    DataTransferComponent,
  ],
  imports: [SharedModule, FinanceRoutingModule],
})
export class FinanceModule {}

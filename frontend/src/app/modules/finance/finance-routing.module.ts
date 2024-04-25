import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';
import { TransacationsTableComponent } from './components/transactions-table/transactions-table.component';
import { DeleteTransactionComponent } from './components/delete-transaction/delete-transaction.component';
import { DataTransferComponent } from './components/data-transfer/data-transfer.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';

const routes: Routes = [
  {
    path: RouterEnum.transactions,
    component: TransacationsTableComponent,
  },
  {
    path: RouterEnum.addTransaction,
    component: AddTransactionComponent,
  },
  {
    path: RouterEnum.detailTransaction + '/:id',
    component: DetailTransactionComponent,
  },
  {
    path: RouterEnum.editTransaction + '/:id',
    component: EditTransactionComponent,
  },
  {
    path: RouterEnum.deleteTransaction + '/:id',
    component: DeleteTransactionComponent,
  },
  {
    path: RouterEnum.dataTransfer,
    component: DataTransferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}

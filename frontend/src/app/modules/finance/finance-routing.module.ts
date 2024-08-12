import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';
import { TransacationsTableComponent } from './components/transactions-table/transactions-table.component';
import { DeleteTransactionComponent } from './components/delete-transaction/delete-transaction.component';
import { DataTransferComponent } from './components/data-transfer/data-transfer.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: RouterEnum.transactions,
    component: TransacationsTableComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.addTransaction,
    component: AddTransactionComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.detailTransaction + '/:id',
    component: DetailTransactionComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.editTransaction + '/:id',
    component: EditTransactionComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.deleteTransaction + '/:id',
    component: DeleteTransactionComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.dataTransfer,
    component: DataTransferComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}

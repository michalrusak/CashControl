import { Component } from '@angular/core';
import { FinanceService } from 'src/app/modules/core/services/finance.service';

@Component({
  selector: 'app-data-transfer',
  templateUrl: './data-transfer.component.html',
  styleUrls: ['./data-transfer.component.scss'],
})
export class DataTransferComponent {
  constructor(private financeService: FinanceService) {}

  downloadAllTransactionToPDF() {
    this.financeService.downloadAllTransactionToPDF();
  }

  downloadAllTransactionsToJSON() {
    this.financeService.downloadAllTransactionsToJSON();
  }
}

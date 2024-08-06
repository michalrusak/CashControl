import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DetailsTransaction } from 'src/app/modules/core/models/transaction.model';
import { FinanceService } from 'src/app/modules/core/services/finance.service';
import { selectCurrency } from 'src/app/modules/preferences/store/preferences.selector';
import { AppState } from 'src/app/store/app.reducer';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.scss'],
})
export class DetailTransactionComponent implements OnInit, OnDestroy {
  transaction!: DetailsTransaction;
  sub = new Subscription();
  RouterEnum = RouterEnum;
  id_transaction!: string;
  currency$: Observable<string> = this.store.select(selectCurrency);

  constructor(
    private route: ActivatedRoute,
    private financeService: FinanceService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe((params) => {
        this.id_transaction = params['id'];
        this.financeService
          .getTransaction(this.id_transaction)
          .subscribe((transaction) => {
            this.transaction = transaction;
          });
      })
    );
  }

  downloadTransactionToJSON(): void {
    this.financeService.downloadTransactionToJSON(this.transaction);
  }

  downloadTransactionToPDF(): void {
    this.financeService.downloadTransactionToPDF(this.transaction);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

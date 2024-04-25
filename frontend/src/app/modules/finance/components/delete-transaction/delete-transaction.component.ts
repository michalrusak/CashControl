import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { FinanceService } from 'src/app/modules/core/services/finance.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.scss'],
})
export class DeleteTransactionComponent implements OnInit, OnDestroy {
  RouterEnum = RouterEnum;

  constructor(
    private financeService: FinanceService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe((params) => {
        this.id_transaction = params['id'];
      })
    );
  }

  sub = new Subscription();
  id_transaction!: string;

  deleteTransaction() {
    this.sub.add(
      this.financeService.deleteTransaction(this.id_transaction).subscribe({
        next: (res) => {
          this.notifierService.notify('success', 'Transaction was deleted!');
          this.router.navigate([RouterEnum.transactions]);
        },
        error: (err) => {
          this.notifierService.notify('error', 'Error');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

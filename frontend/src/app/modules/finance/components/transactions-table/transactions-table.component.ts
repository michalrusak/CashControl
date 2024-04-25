import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import { Transaction } from 'src/app/modules/core/models/transaction.model';
import { FinanceService } from 'src/app/modules/core/services/finance.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransacationsTableComponent implements OnDestroy, AfterViewInit {
  sub = new Subscription();
  RouterEnum = RouterEnum;
  count: number = 0;
  dataSource!: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'lp',
    'category',
    'description',
    'type',
    'amount',
    'details',
  ];

  constructor(
    private financeService: FinanceService,
    private notifierService: NotifierService
  ) {}
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this.financeService.getAllTransactions(
              this.paginator.pageIndex + 1,
              this.paginator.pageSize
            );
          }),
          map((data) => {
            this.count = data.count;
            return data.transactions;
          })
        )
        .subscribe({
          next: (transactions) => {
            this.dataSource = new MatTableDataSource<Transaction>(transactions);
          },
          error: () => {
            this.notifierService.notify(
              'warning',
              'Failed to load transactions'
            );
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

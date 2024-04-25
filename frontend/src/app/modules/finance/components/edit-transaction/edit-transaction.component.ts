import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import {
  DetailsTransaction,
  Finance,
  Transaction,
  UpdateTransactionPayload,
} from 'src/app/modules/core/models/transaction.model';
import { FinanceService } from 'src/app/modules/core/services/finance.service';
import { PreferencesService } from 'src/app/modules/core/services/preferences.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
})
export class EditTransactionComponent implements OnInit, OnDestroy, DoCheck {
  sub = new Subscription();
  financeEnum = Finance;
  incomeCategories!: string[];
  expenseCategories!: string[];
  categories!: string[];
  transaction!: DetailsTransaction;
  id_transaction!: string;
  activeButton: boolean = false;

  RouterEnum = RouterEnum;

  constructor(
    private financeService: FinanceService,
    private preferencesService: PreferencesService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  form = new FormGroup({
    type: new FormControl<Finance>(Finance.expense, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    category: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ],
      nonNullable: true,
    }),

    amount: new FormControl(1, {
      validators: [Validators.required, Validators.min(0.1)],
      nonNullable: true,
    }),
    date: new FormControl(new Date().toISOString(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get controls() {
    return this.form.controls;
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'This field is required!';
    }
    if (control.hasError('minlength')) {
      return 'Not enough character!';
    }
    if (control.hasError('maxlength')) {
      return 'Too many characters';
    }
    if (control.hasError('email')) {
      return 'Email is not valid!';
    }
    if (control.hasError('min')) {
      return 'Amount min 0.1!';
    }

    return '';
  }
  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe((params) => {
        this.id_transaction = params['id'];
        this.financeService
          .getTransaction(this.id_transaction)
          .subscribe((transaction) => {
            this.transaction = transaction;
            this.form.patchValue(transaction);
          });
      })
    );

    this.sub.add(
      this.preferencesService.getUserPreferences().subscribe({
        next: (userPreferences) => {
          if (userPreferences) {
            this.incomeCategories = [...userPreferences.incomeCategories];
            this.expenseCategories = [...userPreferences.expenseCategories];
            this.categories = [...userPreferences.expenseCategories];
          }
        },
      })
    );

    this.sub.add(
      this.form.controls.type.valueChanges.subscribe((value) => {
        this.categories =
          value === Finance.expense
            ? this.expenseCategories
            : this.incomeCategories;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngDoCheck(): void {
    this.checkActiveButton();
  }

  checkActiveButton() {
    if (!this.transaction) return;
    if (this.form.invalid) {
      this.activeButton = false;
      return;
    }

    const isUpdated =
      this.form.value.amount === this.transaction.amount &&
      this.form.value.category === this.transaction.category &&
      this.form.value.date === this.transaction.date &&
      this.form.value.description === this.transaction.description &&
      this.form.value.type === this.transaction.type;

    this.activeButton = isUpdated;
  }

  onSubmit() {
    const changedData: Partial<Transaction> = {};
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control && control.dirty && control.valid) {
        changedData[key as keyof Transaction] = control.value;
      }
    });

    if (Object.keys(changedData).length === 0) {
      this.notifierService.notify('info', 'No changes detected.');
      return;
    }

    const NewChangedData: UpdateTransactionPayload = {
      ...changedData,
      id: this.id_transaction,
    };

    this.sub.add(
      this.financeService.updateTransaction(NewChangedData).subscribe({
        next: () => {
          this.notifierService.notify('success', 'Transaction edit success!');
          this.router.navigate([RouterEnum.transactions]);
        },
        error: () => {
          this.notifierService.notify('error', 'Transaction edit failed!');
        },
      })
    );
  }
}

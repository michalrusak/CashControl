import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Finance } from 'src/app/modules/core/models/transaction.model';
import { FinanceService } from 'src/app/modules/core/services/finance.service';
import { PreferencesService } from 'src/app/modules/core/services/preferences.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  financeEnum = Finance;
  incomeCategories!: string[];
  expenseCategories!: string[];
  categories!: string[];
  RouterEnum = RouterEnum;

  constructor(
    private financeService: FinanceService,
    private preferencesService: PreferencesService,
    private notifierService: NotifierService,
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
        this.form.controls.category.setValue(this.categories[0]);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.sub.add(
      this.financeService.addTransaction(this.form.getRawValue()).subscribe({
        next: () => {
          this.notifierService.notify('success', 'Transaction added!');
          this.router.navigate([RouterEnum.transactions]);
        },
        error: () => {
          this.notifierService.notify('error', 'Transaction failed!');
        },
      })
    );
  }
}

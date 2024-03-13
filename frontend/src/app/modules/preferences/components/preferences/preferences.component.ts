import {
  AfterContentChecked,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { PreferencesService } from 'src/app/modules/core/services/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit, OnDestroy, DoCheck {
  defaultExpenseCategories!: string[];
  defaultIncomeCategories!: string[];
  defaultCurrencies!: string[];
  sub = new Subscription();
  activeButton = false;

  preferencesForm!: FormGroup;

  constructor(
    private preferencesService: PreferencesService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
    this.preferencesForm = this.formBuilder.group({
      expenseCategories: [[], Validators.required],
      incomeCategories: [[], Validators.required],
      currency: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub.add(
      this.preferencesService.getDefaultCurrencies().subscribe({
        next: (currencies) => {
          this.defaultCurrencies = currencies;
        },
      })
    );

    this.sub.add(
      this.preferencesService.getDefaultExpenseCategories().subscribe({
        next: (categories) => {
          this.defaultExpenseCategories = categories;
          this.initializeExpenseCategories(categories);
        },
      })
    );

    this.sub.add(
      this.preferencesService.getDefaultIncomeCategories().subscribe({
        next: (categories) => {
          this.defaultIncomeCategories = categories;
          this.initializeIncomeCategories(categories);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngDoCheck(): void {
    this.checkActiveButton();
  }

  initializeExpenseCategories(categories: string[]): void {
    categories.forEach((category) => {
      this.preferencesForm.addControl(
        'expenseCategory-' + category,
        this.formBuilder.control(false)
      );
    });
  }

  initializeIncomeCategories(categories: string[]): void {
    categories.forEach((category) => {
      this.preferencesForm.addControl(
        'incomeCategory-' + category,
        this.formBuilder.control(false)
      );
    });
  }

  sendPreferences() {
    const expenseCategories = Object.keys(this.preferencesForm.controls)
      .filter((controlName) => controlName.startsWith('expenseCategory-'))
      .filter((controlName) => this.preferencesForm.get(controlName)?.value)
      .map((controlName) => controlName.replace('expenseCategory-', ''));

    const incomeCategories = Object.keys(this.preferencesForm.controls)
      .filter((controlName) => controlName.startsWith('incomeCategory-'))
      .filter((controlName) => this.preferencesForm.get(controlName)?.value)
      .map((controlName) => controlName.replace('incomeCategory-', ''));

    const currency = this.preferencesForm.controls['currency'].value;

    this.preferencesService
      .adduserPreferences({
        incomeCategories,
        expenseCategories,
        currency,
      })
      .subscribe({
        next: () => {
          this.notifierService.notify('success', 'Added user preferences!');
        },
        error: (err) => this.notifierService.notify('error', 'Try again!'),
      });
  }

  checkActiveButton() {
    const expenseCategories = Object.keys(this.preferencesForm.controls)
      .filter((controlName) => controlName.startsWith('expenseCategory-'))
      .filter((controlName) => this.preferencesForm.get(controlName)?.value)
      .map((controlName) => controlName.replace('expenseCategory-', ''));

    const incomeCategories = Object.keys(this.preferencesForm.controls)
      .filter((controlName) => controlName.startsWith('incomeCategory-'))
      .filter((controlName) => this.preferencesForm.get(controlName)?.value)
      .map((controlName) => controlName.replace('incomeCategory-', ''));

    const currency = this.preferencesForm.controls['currency'].value;

    if (
      expenseCategories.length > 0 &&
      incomeCategories.length > 0 &&
      currency
    ) {
      this.activeButton = true;
    } else {
      this.activeButton = false;
    }
  }
}

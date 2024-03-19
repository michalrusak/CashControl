import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { UserPreferences } from 'src/app/modules/core/models/preferences.model';
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
  incomeCategories!: string[];
  expenseCategories!: string[];
  sub = new Subscription();
  activeButton = false;
  userPreferences: UserPreferences = {
    currency: '',
    expenseCategories: [],
    incomeCategories: [],
  };
  preferencesAdded = false;
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
      customExpenseCategories: [''],
      customIncomeCategories: [''],
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
          this.expenseCategories = categories;
          this.initializeExpenseCategories();
        },
      })
    );

    this.sub.add(
      this.preferencesService.getDefaultIncomeCategories().subscribe({
        next: (categories) => {
          this.defaultIncomeCategories = categories;
          this.incomeCategories = categories;
          this.initializeIncomeCategories();
        },
      })
    );

    this.sub.add(
      this.preferencesService.getUserPreferences().subscribe({
        next: (userPreferences) => {
          if (userPreferences) {
            this.userPreferences = userPreferences;
            this.incomeCategories = [...userPreferences.incomeCategories];
            this.expenseCategories = [...userPreferences.expenseCategories];
            this.initializeIncomeCategories();
            this.initializeExpenseCategories();
            this.fillFormWithUserPreferences(userPreferences);
            this.preferencesAdded = true;
          }
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

  addCustomExpenseCategory() {
    const name: string =
      this.preferencesForm.controls['customExpenseCategories'].getRawValue();

    if (name.length < 1) return;

    this.preferencesForm.addControl(
      'expenseCategory-' + name,
      this.formBuilder.control(true)
    );
    this.expenseCategories.push(name);

    this.preferencesForm.controls['customExpenseCategories'].setValue('');

    this.initializeExpenseCategories();
  }

  addCustomIncomeCategory() {
    const name: string =
      this.preferencesForm.controls['customIncomeCategories'].getRawValue();

    if (name.length < 1) return;

    this.preferencesForm.addControl(
      'incomeCategory-' + name,
      this.formBuilder.control(true)
    );
    this.incomeCategories.push(name);

    this.preferencesForm.controls['customIncomeCategories'].setValue('');

    this.initializeIncomeCategories();
  }

  initializeExpenseCategories(): void {
    this.expenseCategories.forEach((category) => {
      this.preferencesForm.addControl(
        'expenseCategory-' + category,
        this.formBuilder.control(false)
      );
    });
  }

  initializeIncomeCategories(): void {
    this.incomeCategories.forEach((category) => {
      this.preferencesForm.addControl(
        'incomeCategory-' + category,
        this.formBuilder.control(false)
      );
    });
  }

  fillFormWithUserPreferences(userPreferences: any): void {
    this.preferencesForm.patchValue({
      currency: userPreferences.currency,
    });

    userPreferences.expenseCategories.forEach((category: string) => {
      this.preferencesForm.get('expenseCategory-' + category)?.setValue(true);
    });

    userPreferences.incomeCategories.forEach((category: string) => {
      this.preferencesForm.get('incomeCategory-' + category)?.setValue(true);
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

    if (this.preferencesAdded) {
      const updatedPreferences: any = {};

      const changedExpenseCategories = Object.keys(
        this.preferencesForm.controls
      )
        .filter((controlName) => controlName.startsWith('expenseCategory-'))
        .filter((controlName) => this.preferencesForm.get(controlName)?.value)
        .map((controlName) => controlName.replace('expenseCategory-', ''));

      if (changedExpenseCategories.length > 0) {
        updatedPreferences.expenseCategories = changedExpenseCategories;
      }

      const changedIncomeCategories = Object.keys(this.preferencesForm.controls)
        .filter((controlName) => controlName.startsWith('incomeCategory-'))
        .filter((controlName) => this.preferencesForm.get(controlName)?.value)
        .map((controlName) => controlName.replace('incomeCategory-', ''));

      if (changedIncomeCategories.length > 0) {
        updatedPreferences.incomeCategories = changedIncomeCategories;
      }

      if (this.preferencesForm.controls['currency'].dirty) {
        updatedPreferences.currency =
          this.preferencesForm.controls['currency'].value;
      }

      this.preferencesService
        .updateUserPreferences(updatedPreferences)
        .subscribe({
          next: () => {
            this.notifierService.notify('success', 'Updated user preferences!');
          },
          error: (err) => this.notifierService.notify('error', 'Try again!'),
        });
    } else {
      this.preferencesService
        .addUserPreferences({
          incomeCategories,
          expenseCategories,
          currency,
        })
        .subscribe({
          next: () => {
            this.notifierService.notify('success', 'Added user preferences!');
            this.preferencesAdded = true;
          },
          error: (err) => this.notifierService.notify('error', 'Try again!'),
        });
    }
  }

  arrayEquals(a: any[], b: any[]): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
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
      const userChangedPreferences =
        this.userPreferences.currency !== currency ||
        !this.arrayEquals(
          this.userPreferences.expenseCategories,
          expenseCategories
        ) ||
        !this.arrayEquals(
          this.userPreferences.incomeCategories,
          incomeCategories
        );

      this.activeButton = userChangedPreferences;
    } else {
      this.activeButton = false;
    }
  }
}

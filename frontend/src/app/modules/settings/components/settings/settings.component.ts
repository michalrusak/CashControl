import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import {
  UpdateUserPayload,
  User,
} from 'src/app/modules/core/models/user.model';
import { SettingsService } from 'src/app/modules/core/services/settings.service';
import { AppState } from 'src/app/store/app.reducer';
import { RouterEnum } from 'src/enums/router.enum';
import * as AuthActions from '../../../auth/store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy, DoCheck {
  activeButton: boolean = false;
  sub = new Subscription();
  userInfo!: User;
  RouterEnum = RouterEnum;

  constructor(
    private settingsService: SettingsService,
    private notifierService: NotifierService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  userSettingForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
  });
  ngOnInit(): void {
    this.sub.add(
      this.settingsService.getUserInfo().subscribe({
        next: (userInfo: User) => {
          this.userInfo = { ...userInfo };
          this.userSettingForm.patchValue(userInfo);
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

  checkActiveButton() {
    if (!this.userInfo) return;
    if (this.userSettingForm.invalid) {
      this.activeButton = false;
      return;
    }

    const userSettings =
      this.userSettingForm.value.email === this.userInfo.email &&
      this.userSettingForm.value.firstName === this.userInfo.firstName &&
      this.userSettingForm.value.lastName === this.userInfo.lastName;

    this.activeButton = !userSettings;
  }

  get controls() {
    return this.userSettingForm.controls;
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

    return '';
  }

  updateUser() {
    const changedData: UpdateUserPayload = {};
    Object.keys(this.userSettingForm.controls).forEach((key) => {
      const control = this.userSettingForm.get(key);
      if (control && control.dirty && control.valid) {
        changedData[key as keyof User] = control.value;
      }
    });

    if (Object.keys(changedData).length === 0) {
      this.notifierService.notify('info', 'No changes detected.');
      return;
    }

    this.settingsService.updateUser(changedData).subscribe({
      next: () => {
        this.notifierService.notify('success', 'Updated user preferences!');
        this.userSettingForm.markAsPristine();
        this.activeButton = false;
        this.store.dispatch(
          AuthActions.UpdateUser({ user: this.userSettingForm.getRawValue() })
        );

        this.router.navigate([RouterEnum.home]);
      },
      error: (err) => this.notifierService.notify('error', 'Try again!'),
    });
  }
}

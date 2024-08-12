import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modules/core/models/user.model';
import { SettingsService } from 'src/app/modules/core/services/settings.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnDestroy {
  sub = new Subscription();
  userInfo!: User;
  RouterEnum = RouterEnum;

  constructor(
    private settingsService: SettingsService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
    newPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
    repeatNewPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
  });

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get controls() {
    return this.changePasswordForm.controls;
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

    return '';
  }

  changePassword() {
    const isPasswordSame =
      this.changePasswordForm.getRawValue().newPassword ===
      this.changePasswordForm.getRawValue().repeatNewPassword;

    if (isPasswordSame) {
      this.sub.add(
        this.settingsService
          .changePassword({
            currentPassword:
              this.changePasswordForm.getRawValue().currentPassword,
            newPassword: this.changePasswordForm.getRawValue().newPassword,
          })
          .subscribe({
            next: (res) => {
              this.notifierService.notify('success', 'Password was changed');
              this.changePasswordForm.markAsPristine();
              this.router.navigate([RouterEnum.home]);
            },
            error: (err) => {
              this.notifierService.notify('error', 'Error');
            },
          })
      );
    } else {
      this.notifierService.notify('warning', 'Passwords aren`t same');
    }
  }
}

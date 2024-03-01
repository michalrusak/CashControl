import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  RouterEnum = RouterEnum;

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),

    lastName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
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
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ],
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

    return '';
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}

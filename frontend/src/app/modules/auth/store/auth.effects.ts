import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authService.login(action.loginData).pipe(
          map((user) => {
            this.router.navigate([RouterEnum.finance]);
            this.notifierService.notify('success', 'Login success!');
            return AuthActions.loginSuccess({ user });
          }),
          catchError((err) => {
            return of(AuthActions.loginFailure({ error: err }));
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        switchMap(() => {
          return this.authService.autoLogin().pipe(
            map((user) => {
              return AuthActions.autoLoginSuccess({ user });
            }),
            catchError((err) => of(AuthActions.autoLoginFailure()))
          );
        })
      )
    // { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            this.router.navigate([RouterEnum.login]);
            this.notifierService.notify('success', 'Logout success');
            return AuthActions.logoutSuccess();
          }),
          catchError((err) => {
            this.notifierService.notify('warning', err);
            return of(AuthActions.logoutFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}
}

import { Injectable } from '@angular/core';
import * as PreferencesActions from './preferences.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { PreferencesService } from '../../core/services/preferences.service';
@Injectable()
export class PreferencesEffects {
  constructor(
    private actions$: Actions,
    private preferencesService: PreferencesService
  ) {}

  getCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferencesActions.getCurrency),
      switchMap(() => {
        return this.preferencesService.getUserPreferences().pipe(
          map((userPrefenrences) => {
            return PreferencesActions.getCurrencySuccess({
              currency: userPrefenrences.currency,
            });
          }),
          catchError((err) => {
            return of(PreferencesActions.getCurrencyFailure({ error: err }));
          })
        );
      })
    )
  );
}

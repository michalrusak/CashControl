import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { PreferencesState } from './preferences.reducer';

export const selectPreferences = (state: AppState) => state.preferences;

export const selectCurrency = createSelector(
  selectPreferences,
  (state: PreferencesState) => state.currency
);

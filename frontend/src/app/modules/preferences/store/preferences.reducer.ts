import { createReducer, on } from '@ngrx/store';
import * as PreferencesActions from './preferences.actions';

export interface PreferencesState {
  currency: string;
  loading: boolean;
  error: string | null;
}

const initialState: PreferencesState = {
  currency: '',
  loading: false,
  error: null,
};

const _preferencesReducer = createReducer(
  initialState,
  on(PreferencesActions.getCurrency, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(PreferencesActions.getCurrencySuccess, (state, action) => ({
    ...state,
    currency: action.currency,
    loading: false,
    error: null,
  })),
  on(PreferencesActions.getCurrencyFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

export function preferencesReducer(
  state: PreferencesState | undefined,
  action: any
) {
  return _preferencesReducer(state, action);
}

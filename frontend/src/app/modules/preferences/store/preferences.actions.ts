import { createAction, props } from '@ngrx/store';

enum PreferncesActionType {
  GET_CURRENCY = '[Preferences] Get Currency',
  GET_CURRENCY_SUCCESS = '[Preferences] Get Currency Success',
  GET_CURRENCY_FAILURE = '[Preferences] Get Currency Failure',
}

export const getCurrency = createAction(PreferncesActionType.GET_CURRENCY);

export const getCurrencySuccess = createAction(
  PreferncesActionType.GET_CURRENCY_SUCCESS,
  props<{ currency: string }>()
);

export const getCurrencyFailure = createAction(
  PreferncesActionType.GET_CURRENCY_FAILURE,
  props<{ error: string }>()
);

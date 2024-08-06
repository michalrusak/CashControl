import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as AuthActions from '../app/modules/auth/store/auth.actions';
import * as PreferencesActions from '../app/modules/preferences/store/preferences.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CashControl';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
    this.store.dispatch(PreferencesActions.getCurrency());
  }
}

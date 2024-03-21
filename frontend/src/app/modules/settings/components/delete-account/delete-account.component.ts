import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/modules/core/services/settings.service';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnDestroy {
  sub = new Subscription();

  constructor(
    private settingsService: SettingsService,
    private notifierService: NotifierService,
    private store: Store<AppState>
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  deleteAccount() {
    this.settingsService.deleteAccount().subscribe({
      next: (res) => {
        this.notifierService.notify('success', 'Account was deleted!');
        this.store.dispatch(AuthActions.logout());
      },
      error: (err) => {
        this.notifierService.notify('error', 'Error');
      },
    });
  }
}

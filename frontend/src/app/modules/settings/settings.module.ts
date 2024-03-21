import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent, DeleteAccountComponent],
  imports: [SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}

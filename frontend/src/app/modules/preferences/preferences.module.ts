import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';

@NgModule({
  declarations: [PreferencesComponent],
  imports: [SharedModule, PreferencesRoutingModule],
})
export class PreferencesModule {}

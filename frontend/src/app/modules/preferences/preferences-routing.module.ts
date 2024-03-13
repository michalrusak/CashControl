import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { RouterEnum } from 'src/enums/router.enum';

const routes: Routes = [
  {
    path: RouterEnum.preferences,
    component: PreferencesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}

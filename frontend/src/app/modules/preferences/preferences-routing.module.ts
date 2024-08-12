import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { RouterEnum } from 'src/enums/router.enum';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: RouterEnum.preferences,
    component: PreferencesComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { RouterEnum } from 'src/enums/router.enum';
import { authGuard } from '../core/guards/auth.guard';
import { formCanDeactivateGuard } from '../core/guards/form-can-deactivate.guard';

const routes: Routes = [
  {
    path: RouterEnum.preferences,
    component: PreferencesComponent,
    canActivate: [authGuard],
    canDeactivate: [formCanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}

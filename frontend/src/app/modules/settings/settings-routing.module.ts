import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterEnum } from 'src/enums/router.enum';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: RouterEnum.settings,
    component: SettingsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: RouterEnum.changePassword,
        component: ChangePasswordComponent,
      },
      {
        path: RouterEnum.deleteAccount,
        component: DeleteAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

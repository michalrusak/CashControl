import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterEnum } from 'src/enums/router.enum';

const routes: Routes = [
  {
    path: RouterEnum.login,
    component: LoginComponent,
  },
  {
    path: RouterEnum.register,
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

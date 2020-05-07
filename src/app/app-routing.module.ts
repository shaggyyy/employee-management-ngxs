import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/component/dashboard/dashboard.component';
import { EmplyeeProfileComponent } from './emplyee-profile/component/emplyee-profile.component';
import { LoginRegisterGridComponent } from './core/component/login-register-grid/login-register-grid.component';
import { AuthGuard } from './auth.guard';
import { HasUserGuard } from './has-user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginRegisterGridComponent,
    canActivate: [HasUserGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: EmplyeeProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

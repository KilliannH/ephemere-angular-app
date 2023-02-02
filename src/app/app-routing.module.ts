import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // order is important
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
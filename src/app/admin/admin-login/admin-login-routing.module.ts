import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';
import { AdminLoginComponent } from './admin-login.component';

const routes: Routes = [
  {path:'',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLoginRoutingModule { }

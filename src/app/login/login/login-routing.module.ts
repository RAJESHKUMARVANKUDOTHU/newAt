import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SetPasswordComponent} from '../set-password/set-password.component'
const routes: Routes = [
  {path:'set-password',component:SetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

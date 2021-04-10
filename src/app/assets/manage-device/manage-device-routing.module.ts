import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ManageDeviceComponent } from './manage-device.component';

const routes: Routes = [
  // {path:'manage-device',component:ManageDeviceComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDeviceRoutingModule { }

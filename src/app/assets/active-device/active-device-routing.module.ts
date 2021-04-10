import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ActiveDeviceComponent } from './active-device.component';
const routes: Routes = [
  // {path:'active-device',component:ActiveDeviceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveDeviceRoutingModule { }

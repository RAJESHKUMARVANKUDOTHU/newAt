import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { OfflineDeviceComponent } from './offline-device.component';

const routes: Routes = [
  // {path:'offline-device',component:OfflineDeviceComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineDeviceRoutingModule { }

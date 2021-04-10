import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDeviceComponent } from '../manage-device/manage-device.component';
import { ManageGatewayComponent } from '../manage-gateway/manage-gateway.component';
import { ManageCoinComponent } from '../manage-coin/manage-coin.component';
import { ActiveDeviceComponent } from '../active-device/active-device.component';
import { OfflineDeviceComponent } from '../offline-device/offline-device.component';
const routes: Routes = [
  { 
    path: 'manage-device',component:ManageDeviceComponent   
 },
  { 
    path: 'manage-gateway',component:ManageGatewayComponent   
 },
  { 
    path: 'manage-coin',component:ManageCoinComponent   
 },
  { 
    path: 'active-device',component:ActiveDeviceComponent   
 },
  { 
    path: 'offline-device',component:OfflineDeviceComponent   
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAssetRoutingModule { }

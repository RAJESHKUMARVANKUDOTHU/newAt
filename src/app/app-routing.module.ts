import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageAssetComponent } from './assets/manage-asset/manage-asset.component';
import { GeofenceComponent } from './geofence/geofence.component';
import { ContactComponent } from './contact/contact.component';
import { ReportComponent } from './report/report.component';
import { MapCenterComponent } from './map-center/map-center.component';
import { ManageDeviceComponent } from './assets/manage-device/manage-device.component';
import { ManageGatewayComponent } from './assets/manage-gateway/manage-gateway.component';
import { ManageCoinComponent } from './assets/manage-coin/manage-coin.component';
import { ActiveDeviceComponent } from './assets/active-device/active-device.component';
import { OfflineDeviceComponent } from './assets/offline-device/offline-device.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {path:'login' , component:LoginComponent},
  { path: '', component:DashboardComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'manage-asset', component:ManageAssetComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'map-center', component:MapCenterComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'geofence', component:GeofenceComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'contact', component:ContactComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'report', component:ReportComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'setting', component:SettingComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'manage-device', component:ManageDeviceComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'manage-gateway', component:ManageGatewayComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'manage-coin', component:ManageCoinComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'active-device', component:ActiveDeviceComponent, canActivate: [AuthGuard], data:{role:['user']}},
  { path: 'offline-device', component:OfflineDeviceComponent, canActivate: [AuthGuard], data:{role:['user']}},

  {path:'admin-login' , component:AdminLoginComponent},
  {path:'admin-dashboard' , component:AdminDashboardComponent, canActivate: [AuthGuard], data:{role:['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
// import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
// import { ManageAssetComponent } from './assets/manage-asset/manage-asset.component';
// import { GeofenceComponent } from './geofence/geofence.component';
import { ContactComponent } from './contact/contact.component';
import { MapCenterComponent } from './map-center/map-center.component';

// import { SettingComponent } from './setting/setting/setting.component';
import { LiveDataComponent } from './live-data/live-data.component';
// import { GeofenceDashboardComponent } from './geofence-dashboard/geofence-dashboard.component';
import { ProfileComponent } from './createProfile/profile/profile.component';
import { MapComponent } from './map/map.component';
// import { MapActionsComponent } from './map-actions/map-actions.component';
// import { ZoneConfigurationComponent } from './zone-configuration/zone-configuration.component';
import { VehicleStatusComponent } from './vehicle-status/vehicle-status.component';
// import { ZoneDashboardComponent } from './zone-dashboard/zone-dashboard.component';
// import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';

const routes: Routes = [
  {path:'login' , loadChildren:()=>import('./login/login/login.module').then(m=>m.LoginModule)},
  { path: '', component:DashboardComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'set-password',loadChildren:()=>import('./login/set-password/set-password.module').then(m=>m.SetPasswordModule)},
  { path: 'report',loadChildren:()=>import('./report/report/report.module').then(m=>m.ReportModule), canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'geofence',loadChildren:()=> import('./geofence/geofence.module').then(m=>m.GeofenceModule),canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'manage-asset',loadChildren:()=>import('./assets/manage-asset/manage-asset.module').then(m=>m.ManageAssetModule),canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'setting',loadChildren:()=> import('./setting/setting/setting.module').then(m=>m.SettingModule), canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'geofence-dashboard', loadChildren:()=> import('./geofence-dashboard/geofence-dashboard.module').then(m=>m.GeofenceDashboardModule),  canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'map-actions',loadChildren:()=> import('./map-actions/map-actions.module').then(m=>m.MapActionsModule),  canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'zone-configuration', loadChildren:()=> import('./zone-configuration/zone-configuration.module').then(m=>m.ZoneConfigurationModule),  canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'zone-dashboard',loadChildren:()=> import('./zone-dashboard/zone-dashboard.module').then(m=>m.ZoneDashboardModule),   canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'map-center', component:MapCenterComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'contact', component:ContactComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
 
  { path: 'live-data', component:LiveDataComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'profile', component:ProfileComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'map', component:MapComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},
  { path: 'vehicle-status', component:VehicleStatusComponent, canActivate: [AuthGuard], data:{role:['adminRole','userRole', 'coAdminRole', 'subAdminRole']}},

  {path:'admin-login' ,loadChildren:()=> import('./admin/admin-login/admin-login.module').then(m=>m.AdminLoginModule)},
  {path:'admin-dashboard',loadChildren:()=> import('./admin/admin-dashboard/admin-dashboard.module').then(m=>m.AdminDashboardModule), canActivate: [AuthGuard], data:{role:['superAdminRole']}},
  {path:'admin-settings' , loadChildren:()=> import('./admin/admin-settings/admin-settings.module').then(m=>m.AdminSettingsModule), canActivate: [AuthGuard], data:{role:['superAdminRole']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

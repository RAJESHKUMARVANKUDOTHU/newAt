import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GeofenceDashboardComponent } from './geofence-dashboard.component';

const routes: Routes = [
  // {path:'',component:GeofenceDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeofenceDashboardRoutingModule { }

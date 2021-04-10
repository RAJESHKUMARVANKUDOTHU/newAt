import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ZoneDashboardComponent } from './zone-dashboard.component';

const routes: Routes = [
  // {path:'',component:ZoneDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneDashboardRoutingModule { }

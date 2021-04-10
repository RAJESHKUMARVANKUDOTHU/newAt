import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneConfigurationComponent } from './zone-configuration.component';

const routes: Routes = [
  {path:'',component:ZoneConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneConfigurationRoutingModule { }

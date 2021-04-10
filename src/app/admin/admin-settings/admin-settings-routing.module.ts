import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings.component';
import { AdminSettingsModule } from './admin-settings.module';

const routes: Routes = [
  {path:'',component:AdminSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsRoutingModule { }

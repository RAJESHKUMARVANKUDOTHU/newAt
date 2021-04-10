import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapActionsComponent } from './map-actions.component';

const routes: Routes = [
  {path:'',component:MapActionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapActionsRoutingModule { }

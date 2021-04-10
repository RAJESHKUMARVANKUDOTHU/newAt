import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ManageCoinComponent } from './manage-coin.component';

const routes: Routes = [
  // {path:'',component:ManageCoinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCoinRoutingModule { }

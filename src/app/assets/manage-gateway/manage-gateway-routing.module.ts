import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ManageGatewayComponent } from './manage-gateway.component';


const routes: Routes = [
  // {path:'',component:ManageGatewayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageGatewayRoutingModule { }

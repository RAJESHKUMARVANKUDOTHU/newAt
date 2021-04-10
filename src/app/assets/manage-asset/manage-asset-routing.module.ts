import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAssetComponent } from './manage-asset.component';

const routes: Routes = [
  {path:'',component:ManageAssetComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAssetRoutingModule { }

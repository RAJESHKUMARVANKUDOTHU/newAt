import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AddAssetsComponent } from '../../assets/add-assets/add-assets.component';
import { EditAssetsComponent } from '../../assets/edit-assets/edit-assets.component';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-manage-gateway',
  templateUrl: './manage-gateway.component.html',
  styleUrls: ['./manage-gateway.component.css']
})
export class ManageGatewayComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  gatewayData:any=[]
  dataSource: any = [];
  displayedColumns = ['i','gatewayId','gatewayName','updatedOn','edit','delete'];
  constructor(
    public dialog: MatDialog,    
    private login:LoginAuthService,
    private api: ApiService,
    private general:GeneralService
  ) { }

  ngOnInit(): void {
    this.refreshGateway()
  }

  openDailog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '40vw';
    dialogConfig.data={
      type:'gateway'
    }
    
    const dialogRef = this.dialog.open(AddAssetsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
        this.refreshGateway()
    });
  }

  refreshGateway(){
    this.api.getGatewayData().then((res:any)=>{
      this.gatewayData=[]
      console.log("gateway submit====",res);
      if(res.status){
        // this.general.registeredGatewayCount=res.success.length
        this.general.gatewayData=res.success
        for(let i=0;i<res.success.length;i++){
          if(res.success[i] != null){
            this.gatewayData.push({
              i:i+1,
              id:res.success[i].id,
              gatewayName:res.success[i].gatewayName,
              gatewayId:res.success[i].gatewayId,
              updatedOn:res.success[i].updatedOn,
              edit:'edit',
              delete:'delete_forever'
            })
          }
        }
        this.dataSource = new MatTableDataSource(this.gatewayData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator
        })
      }
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
  edit(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data={
      type:'gateway',
      data:data
    }
    
    const dialogRef = this.dialog.open(EditAssetsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      this.refreshGateway()
    });
  }

  delete(data){
    if(confirm('Are you sure you want to delete gateway?')){
      this.api.deleteGateway(data).then((res:any)=>{
        console.log("coin delete====",res);
       
        if(res.status){
          var msg = 'Coin deleted Successfully'
          this.general.openSnackBar(msg,'')
        }
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }

}

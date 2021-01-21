import { Component, OnInit,ViewChild } from '@angular/core';
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
  selector: 'app-manage-device',
  templateUrl: './manage-device.component.html',
  styleUrls: ['./manage-device.component.css']
})
export class ManageDeviceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  findData:any=[]
  dataSource: any = [];
  displayedColumns = ['i','deviceId','deviceName','on-off','updatedOn','edit','delete']; //,'batteryStatus'
  constructor(
    public dialog: MatDialog,    
    private login:LoginAuthService,
    private api: ApiService,
    private general:GeneralService
  ) { }

  ngOnInit(): void {
    this.refreshDevice()
  }
  openDailog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '30vw';
    dialogConfig.data={
      type:'find',
      
    }
    
    const dialogRef = this.dialog.open(AddAssetsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      this.refreshDevice()
    });
  }

  refreshDevice(){

    this.api.getDeviceData().then((res:any)=>{
      this.findData=[]
      console.log("find submit====",res);
      if(res.status){
        for(let i=0;i<res.success.length;i++){
          if(res.success[i] != null){
            this.findData.push({
              i:i+1,
              id:res.success[i]._id,
              userId:res.success[i].userId,
              deviceName:res.success[i].deviceName,
              deviceId:res.success[i].deviceId,
              updatedOn:res.success[i].updatedAt,
              edit:'edit',
              delete:'delete_forever'
            })
          }
        }
        this.dataSource = new MatTableDataSource(this.findData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator
        })
      }
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
  getBatteryStatus(data){

  }

  edit(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '30vw';
    dialogConfig.data={
      type:'find',
      data:data
    }
    
    const dialogRef = this.dialog.open(EditAssetsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      this.refreshDevice()
    });
  }
  delete(data){
    console.log("data==",data)
    data.deviceObjectId=data.id
    if(confirm('Are you sure you want to delete device?')){
      this.api.deleteDevice(data).then((res:any)=>{
        console.log("device delete====",res);
       
        if(res.status){
          this.refreshDevice()
          var msg = res.success
          this.general.openSnackBar(msg,'')
        }
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }

  toggle(a){
    var data={
      _id:a.id,
      userId:a.userId,
      deviceName:a.deviceName,
      deviceId:a.deviceId,
      deviceToggleStatus:true

    }
    if(confirm('Are you sure you want to delete device?')){
      this.api.deviceOnOff(data).then((res:any)=>{
        console.log("device delete====",res);
       
        if(res.status){
          this.refreshDevice()
          var msg = res.success
          this.general.openSnackBar(msg,'')
        }
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }
}


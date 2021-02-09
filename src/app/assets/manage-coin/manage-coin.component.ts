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
  selector: 'app-manage-coin',
  templateUrl: './manage-coin.component.html',
  styleUrls: ['./manage-coin.component.css']
})
export class ManageCoinComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: any = [];
  coinData:any=[]
  fileName : String =''
  displayedColumns = ['i','coinId','coinName','gatewayId','coinBattery','updatedOn','edit','delete'];
  constructor(
    public dialog: MatDialog,    
    private login:LoginAuthService,
    private api: ApiService,
    private general:GeneralService
  ) { }

  ngOnInit(): void {
    this.refreshCoin()
  }
  openDailog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '30vw';
    dialogConfig.data={
      type:'coin'
    }
    
    const dialogRef = this.dialog.open(AddAssetsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      this.refreshCoin()
    });
  }

  refreshCoin(){
    this.api.getCoinData().then((res:any)=>{
      
      console.log("coin submit====",res);
      this.coinData=[]
      if(res.status){
        for(let i=0;i<res.success.length;i++){
          if(res.success[i] != null){
            this.coinData.push({
              i:i+1,
              id:res.success[i]._id,
              userId:res.success[i].userId,
              coinId:res.success[i].coinId,
              coinName:res.success[i].coinName,
              coinBattery:res.success[i].coinBattery,
              gatewayId:res.success[i].gatewayId,
              updatedOn:res.success[i].updatedAt,
              edit:'edit',
              delete:'delete_forever'
            })
          }
        }
        this.dataSource = new MatTableDataSource(this.coinData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator
        })
      }
      else{}
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  
  getBatteryStatus(data){
    
    if(data.coinBattery == "H"){
    
      var a = {
        'background-color':'green',
        'width':'31px'
      }
      return a
    }
    // else if(value == 2){
    //   var a = {
    //     'background-color':'#ffc107',
    //     'width':'18px'
    //   }
    //   return a
    // }
    else if(data.coinBattery == "L"){
      var a = {
        'background-color':'red',
        'width':'10px'
      }
      return a
    }
    else{
      return {}
    }
  }
  edit(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '30vw';
    dialogConfig.data={
      type:'coin',
      data:data
    }
    
    const dialogRef = this.dialog.open(EditAssetsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      this.refreshCoin()
    });
  }
 

  delete(data){
    data.coinObjectId=data.id

    if(confirm('Are you sure you want to delete coin?')){
      this.api.deleteCoin(data).then((res:any)=>{
        console.log("coin delete====",res);
       
        if(res.status){
          this.refreshCoin()
          var msg = res.success
          this.general.openSnackBar(msg,'')
        }
        else{}
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
    else{}
  }

  download(){
    this.fileName = "Registered coins"
    this.api.downloadRegisteredCoins(this.fileName).then((res:any)=>{
        console.log("Registerd coins download==",res)
    }).catch((err:any)=>{
      console.log("error==",err)
    })
  }
}

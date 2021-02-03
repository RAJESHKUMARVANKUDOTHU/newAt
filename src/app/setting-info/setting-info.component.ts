import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.css']
})
export class SettingInfoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  type:any
  coinData : any = []
  deviceData : any = []
  zoneData : any = []
  groupData :any = []
  dataSource : any = []
  dataSource1 : any = []
  dataSource2 : any = []
  dataSource3 : any = []
  timeDelay = ['deviceId','timeDelay']
  findInactivityTime = ['deviceId','inActivityTime','sms','email']
  coinInactivityTime = ['coinId','inActivityTime','sms','email']
  coinConfig = ['coinId','zoneName']
  zoneCategory = ['zoneName', 'standardTime']
  groupInfo = ['i','groupName']
  coinGroup = ['coinId','coinName','groupName']
  constructor(
    public dialogRef: MatDialogRef<SettingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private login:LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
  ) { 
    this.type=data.type
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    if(this.type == 'timeDelay' || this.type == 'find-inactive' || this.type == 'max-find')
    {
      this.refreshDevice()
    }
    else if(this.type == 'coin' || this.type == 'coin-cat' || this.type == 'coinGrp'){
      this.refreshCoin()
    }
    else if(this.type == 'groupName'){
      this.getGroups()
    }
    else{
      this.getZoneDetails()
    }
  }

 
  refreshCoin(){
    this.api.getCoinData().then((res:any)=>{
      console.log("coin submit====",res);
      this.coinData=[]
      this.dataSource=[]
      if(res.status){
        this.coinData=res.success
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
 
  refreshDevice(){

    this.api.getDeviceData().then((res:any)=>{
      this.deviceData=[]
      this.dataSource1=[]
      console.log("find submit====",res);
      if(res.status){
          this.deviceData=res.success
          this.dataSource1 = new MatTableDataSource(this.deviceData);
          setTimeout(() => {
            this.dataSource1.sort = this.sort;
            this.dataSource1.paginator=this.paginator
          })

      }
      else{}
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  getZoneDetails(){
    this.api.getZone().then((res:any)=>{
      console.log("zone details response==",res)
      this.zoneData=[]
      this.dataSource2=[]
      if(res.status){
        this.zoneData=res.success
        this.dataSource2 = new MatTableDataSource(this.zoneData);
        setTimeout(() => {
          this.dataSource2.sort = this.sort;
          this.dataSource2.paginator=this.paginator
        })
      }
      else{}

    })
  }
  
  getGroups(){
    this.api.getGroup().then((res:any)=>{
      console.log("group details response==",res)
      this.groupData=[]
      if(res.status){
        this.groupData=res.success
        this.dataSource3 = new MatTableDataSource(this.groupData);
        setTimeout(() => {
          this.dataSource3.sort = this.sort;
          this.dataSource3.paginator=this.paginator
        })
      }
      else{}
    })
  }
}

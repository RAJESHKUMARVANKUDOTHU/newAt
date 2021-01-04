import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../../services/api.service';
import { LoginAuthService } from '../../services/login-auth.service';
@Component({
  selector: 'app-offline-device',
  templateUrl: './offline-device.component.html',
  styleUrls: ['./offline-device.component.css']
})
export class OfflineDeviceComponent implements OnInit {
  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort3: MatSort;
  @ViewChild(MatPaginator) paginator3: MatPaginator;
  OfflineDeviceData:any=[]
  OfflineGatewayData:any=[]
  OfflineCoinData:any=[]
  findLen:any=0
  gatewayLen:any=0
  coinLen:any=0
  dataSource3: any = [];
  dataSource1: any = [];
  dataSource2: any = [];
  displayedColumns1 = ['i','deviceId','deviceName','updatedOn'];
  displayedColumns2 = ['i','gatewayName','gatewayId','updatedOn'];
  displayedColumns3 = ['i','coinId','coinName','gatewayId','updatedOn'];
  constructor(
    private login:LoginAuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.refreshOfflineDeviceList()
    this.refreshOfflineGatewayList()
    this.refreshOfflineCoinList()
  }
  refreshOfflineDeviceList(){
    this.api.getActiveDeviceList().then((res:any)=>{
      console.log("device submit====",res);
      this.OfflineDeviceData=[]
      if(res.status){
        this.OfflineDeviceData=res.offlineDeviceList
        this.findLen=res.offlineDeviceList.length
        console.log("findlen==",this.findLen)
        this.dataSource3 = new MatTableDataSource(this.OfflineDeviceData);

        setTimeout(() => {
          this.dataSource3.sort1 = this.sort1;
          this.dataSource3.paginator1=this.paginator1
          this.dataSource3.length= this.findLen
        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err) 
    })
  }

  refreshOfflineGatewayList(){
    this.api.getActiveGatewayList().then((res:any)=>{
      console.log("gateway submit====",res);
      this.OfflineGatewayData=[]
    
      if(res.status){
        this.OfflineGatewayData=res.offlineGatewayList
        this.gatewayLen=res.offlineGatewayList.length
        // for(let i=0;i<res.offlineGatewayList.length;i++){
        //   if(res.offlineGatewayList[i] != null){
        //     this.OfflineGatewayData.push(res.offlineGatewayList[i])
        //   }
        // }
      
        console.log("this.OfflineGatewayData=========",this.OfflineGatewayData)
        this.dataSource1 = new MatTableDataSource(this.OfflineGatewayData);

        setTimeout(() => {
          this.dataSource1.sort2 = this.sort2;
          this.dataSource1.paginator2=this.paginator2
          this.dataSource1.length=this.gatewayLen
        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  refreshOfflineCoinList(){
    this.api.getActiveCoinList().then((res:any)=>{
      console.log("coin submit====",res);
      this.OfflineCoinData=[]
    
      if(res.status){
        this.OfflineCoinData=res.offlineCoinList
        this.coinLen=res.offlineCoinList.length
        // for(let i=0;i<res.offlineCoinList.length;i++){
        //   if(res.offlineCoinList[i] != null){
        //     this.OfflineCoinData.push(res.offlineCoinList[i])
        //   }
         
        // }
        this.dataSource2 = new MatTableDataSource(this.OfflineCoinData);

        setTimeout(() => {
          this.dataSource2.sort3 = this.sort3;
          this.dataSource2.paginator3=this.paginator3
          this.dataSource2.length=this.coinLen
        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
}

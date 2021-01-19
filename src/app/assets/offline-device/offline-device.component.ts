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
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('sort3') sort3: MatSort;
  @ViewChild('paginator3') paginator3: MatPaginator;
  
  OfflineDeviceData:any=[]
  OfflineGatewayData:any=[]
  OfflineCoinData:any=[]
  dataSource0: any = [];
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
      // console.log("device submit====",res);
      this.OfflineDeviceData=[]
      if(res.status){
        this.OfflineDeviceData=res.offlineDeviceList
        this.dataSource0 = new MatTableDataSource(this.OfflineDeviceData);

        setTimeout(() => {
           this.dataSource0.paginator = this.paginator1
          this.dataSource0.sort = this.sort1
         })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err) 
    })
  }

  refreshOfflineGatewayList(){
    this.api.getActiveGatewayList().then((res:any)=>{
      // console.log("gateway submit====",res);
      this.OfflineGatewayData=[]
    
      if(res.status){
        this.OfflineGatewayData=res.offlineGatewayList
        // for(let i=0;i<res.offlineGatewayList.length;i++){
        //   if(res.offlineGatewayList[i] != null){
        //     this.OfflineGatewayData.push(res.offlineGatewayList[i])
        //   }
        // }
      
        console.log("this.OfflineGatewayData=========",this.OfflineGatewayData)
        this.dataSource1 = new MatTableDataSource(this.OfflineGatewayData);

        setTimeout(() => {
          this.dataSource1.paginator = this.paginator2
          this.dataSource1.sort = this.sort2
         })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  refreshOfflineCoinList(){
    this.api.getActiveCoinList().then((res:any)=>{
      // console.log("coin submit====",res);
      this.OfflineCoinData=[]
    
      if(res.status){
        this.OfflineCoinData=res.offlineCoinList
        // for(let i=0;i<res.offlineCoinList.length;i++){
        //   if(res.offlineCoinList[i] != null){
        //     this.OfflineCoinData.push(res.offlineCoinList[i])
        //   }
         
        // }
        this.dataSource2 = new MatTableDataSource(this.OfflineCoinData);

        setTimeout(() => {
          this.dataSource2.paginator = this.paginator3
          this.dataSource2.sort = this.sort3
        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
}

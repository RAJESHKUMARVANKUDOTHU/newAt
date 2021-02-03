import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../../services/api.service';
import { LoginAuthService } from '../../services/login-auth.service';

@Component({
  selector: 'app-active-device',
  templateUrl: './active-device.component.html',
  styleUrls: ['./active-device.component.css']
})
export class ActiveDeviceComponent implements OnInit {
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('sort3') sort3: MatSort;
  @ViewChild('paginator3') paginator3: MatPaginator;

  activeDeviceData:any=[]
  activeGatewayData:any=[]
  activeCoinData:any=[]
  dataSource0: any = [];
  dataSource1: any = [];
  dataSource2: any = [];
 
  displayedColumns1 = ['i','deviceId','deviceName','updatedAt'];
  displayedColumns2 = ['i','gatewayId','gatewayName','updatedAt'];
  displayedColumns3 = ['i','coinId','coinName','gatewayId','updatedAt'];
  constructor(
    private login:LoginAuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.refreshActiveDeviceList()
    
  }
  refreshActiveDeviceList(){
    this.api.getOnlineDevice().then((res:any)=>{
      console.log("getOnlineDevice res====",res);
      this.activeDeviceData=[]
      this.activeGatewayData=[]
      this.activeCoinData=[]
      if(res.status){
        this.activeDeviceData=res.success.device.onlineDevice
        this.activeGatewayData=res.success.gateway.onlineGateway
        this.activeCoinData=res.success.coin.onlineCoin
        // for(let i=0;i<res.success.onlineDevice.length;i++){
        //   if(res.activeDeviceList[i] != null){
        //     this.activeDeviceData.push(res.success.onlineDevice[i])
        //   }
        // }
        this.dataSource0 = new MatTableDataSource(this.activeDeviceData);
        this.dataSource1 = new MatTableDataSource(this.activeGatewayData);
        this.dataSource2 = new MatTableDataSource(this.activeCoinData);

        setTimeout(() => {
          this.dataSource0.paginator = this.paginator1
          this.dataSource0.sort = this.sort1
          this.dataSource1.paginator = this.paginator2
          this.dataSource1.sort = this.sort2
          this.dataSource2.paginator = this.paginator3
          this.dataSource2.sort = this.sort3
        })
      }
      else{}
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

}


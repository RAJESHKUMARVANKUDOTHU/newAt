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
 
  displayedColumns1 = ['i','deviceId','deviceName','updatedOn'];
  displayedColumns2 = ['i','gatewayId','gatewayName','updatedOn'];
  displayedColumns3 = ['i','coinId','coinName','gatewayId','updatedOn'];
  constructor(
    private login:LoginAuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.refreshActiveDeviceList()
    this.refreshActiveGatewayList()
    this.refreshActiveCoinList()
  }
  refreshActiveDeviceList(){
    this.api.getActiveDeviceList().then((res:any)=>{
      console.log("coin submit====",res);
      this.activeDeviceData=[]
      if(res.status){
    
        for(let i=0;i<res.activeDeviceList.length;i++){
          if(res.activeDeviceList[i] != null){
            this.activeDeviceData.push(res.activeDeviceList[i])
          }
        }
        this.dataSource1 = new MatTableDataSource(this.activeDeviceData);

        setTimeout(() => {
          this.dataSource0.paginator = this.paginator1
          this.dataSource0.sort = this.sort1

        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  refreshActiveGatewayList(){
    this.api.getActiveGatewayList().then((res:any)=>{
      console.log("gateway submit====",res);
      this.activeGatewayData=[]
      if(res.status){
        this.activeGatewayData=res.activeGatewayList
        this.dataSource1 = new MatTableDataSource(this.activeCoinData);

        setTimeout(() => {
          this.dataSource1.paginator = this.paginator2
          this.dataSource1.sort = this.sort2
        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  refreshActiveCoinList(){
    this.api.getActiveCoinList().then((res:any)=>{
      console.log("coin submit====",res);
      this.activeCoinData=[]
      if(res.status){
        for(let i=0;i<res.activeCoinList.length;i++){
          if(res.activeCoinList[i] != null){
            this.activeCoinData.push(res.activeCoinList[i])
          }
        }
        this.dataSource2 = new MatTableDataSource(this.activeCoinData);

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


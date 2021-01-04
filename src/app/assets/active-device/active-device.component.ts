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
  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort3: MatSort;
  @ViewChild(MatPaginator) paginator3: MatPaginator;

  activeDeviceData:any=[]
  activeGatewayData:any=[]
  activeCoinData:any=[]
  findLen:any=0
  gatewayLen:any=0
  coinLen:any=0
  dataSource1: any = [];
  dataSource2: any = [];
  dataSource3: any = [];
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
        this.findLen=res.activeDeviceList.length
        for(let i=0;i<res.activeDeviceList.length;i++){
          if(res.activeDeviceList[i] != null){
            this.activeDeviceData.push(res.activeDeviceList[i])
          }
        }
        this.dataSource1 = new MatTableDataSource(this.activeDeviceData);

        setTimeout(() => {
          this.dataSource1.sort1 = this.sort1;
          this.dataSource1.paginator1=this.paginator1
          this.dataSource1.length= this.findLen

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
        this.gatewayLen=res.activeGatewayList.length
        this.dataSource2 = new MatTableDataSource(this.activeCoinData);

        setTimeout(() => {
          this.dataSource2.sort2 = this.sort2;
          this.dataSource2.paginator2=this.paginator2
          this.dataSource2.length= this.gatewayLen
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
        this.coinLen=res.activeCoinList.length
        for(let i=0;i<res.activeCoinList.length;i++){
          if(res.activeCoinList[i] != null){
            this.activeCoinData.push(res.activeCoinList[i])
          }
        }
        this.dataSource3 = new MatTableDataSource(this.activeCoinData);

        setTimeout(() => {
          this.dataSource3.sort3 = this.sort3;
          this.dataSource3.paginator3=this.paginator3
          this.dataSource3.length= this.coinLen
        })
      }
  
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
}


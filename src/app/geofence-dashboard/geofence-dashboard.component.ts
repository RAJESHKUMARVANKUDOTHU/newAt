import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
import { LoginAuthService } from '../services/login-auth.service';
@Component({
  selector: 'app-geofence-dashboard',
  templateUrl: './geofence-dashboard.component.html',
  styleUrls: ['./geofence-dashboard.component.css']
})
export class GeofenceDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  deviceData: any = []
  dataSource: any = [];
  displayedColumns = ['i', 'deviceId', 'deviceName', 'coinId', 'updatedOnLoc', 'geofenceStatus'];
  geoFencestatus:boolean=false;
  interval : any;
  constructor(
    public general: GeneralService,
    private api: ApiService,
    public login:LoginAuthService
  ) { }

  ngOnInit(): void {
    this.refreshGeofence();
    this.login.loginCheckData.subscribe(res => {
      if (!res.other) {
        this.clearTimeInterval()
      }
    });
    this.interval = setInterval(()=>{
      this.refreshGeofence();
    },10000);
  }

  ngOnDestroy() {
    this.clearTimeInterval()
  }

  clearTimeInterval() {
    clearInterval(this.interval);
  }

  status(data){
    this.deviceData.forEach((element,index) => {
      if(element.deviceId == data.deviceId){
        this.deviceData[index].geoFencestatus=true
      }
      else{
        this.deviceData[index].geoFencestatus= false
      }
    });
    
  }
  refreshGeofence() {
    this.api.getDeviceGeofence().then((res:any)=>{
      console.log("getDeviceGeofence res==",res)
      if(res.status){
        this.deviceData=res.success
        // for(let i=0; i<res.success.length;i++){
        //   res.success[i].totalTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
        // }
        this.dataSource = new MatTableDataSource(this.deviceData);
    
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
    
        })
      }
      else{

      }
    })
  }
  
  search(a) {
    this.dataSource = new MatTableDataSource(this.deviceData);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter =a.trim().toLowerCase()
    })
  }

}

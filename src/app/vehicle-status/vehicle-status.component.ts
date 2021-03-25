import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.css']
})
export class VehicleStatusComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  zoneData: any = []
  dataSource: any = [];
  displayedColumns = [ 'coinName','inTime', 'outTime', 'totTime'];
  vehicleData:any=[]
  constructor(
    private api: ApiService,
    public general: GeneralService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let data= JSON.parse(params.record) ;
       console.log("records=",this.vehicleData )
      this.getVehicleStatus(data)
  })
    this.getZoneDetails()
  }

  getVehicleStatus(device){
    var data={
      deviceId:device.deviceId,
      deviceName:device.deviceName
    }
    this.api.getVehicleStatus(data).then((res:any)=>{
      console.log("res==",res)
      if(res.status){
        this.vehicleData=res.success
        for (let i = 0; i < this.vehicleData.locations.length; i++) {
          this.vehicleData.locations[i].totTime = this.general.getTotTime(this.vehicleData.locations[i].inTime, this.vehicleData.locations[i].outTime)
        }
        this.dataSource = new MatTableDataSource(this.vehicleData.locations);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
        })
      }else{
        this.vehicleData=[]
      }
    }).catch((err)=>{
      console.log("err===",err)
    })
  }
  getZoneDetails() {
    this.api.getZone().then((res: any) => {
      console.log('zone details response==', res);
      this.zoneData = [];
      if (res.status) {
        this.zoneData = res.success;
      }
      else { }

    })
  }
  getFillColor(value) {

    var a = {
      'background-color': 'green',
      width: 'fit-content'

    }
    return a
  }

}

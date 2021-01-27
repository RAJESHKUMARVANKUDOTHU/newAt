import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { LoginAuthService } from '../services/login-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.css']
})
export class GeofenceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('allSelected') private allSelected:MatOption
  @ViewChild('allSelected1') private allSelected1:MatOption
  geofenceForm:FormGroup
  geoFenceData:any=[]
  coinData:any
  deviceData:any
  dataSource:any=[]
  displayedColumns=['i','deviceId','deviceName']
  constructor(
    private login:LoginAuthService,
    private api: ApiService,
    private general:GeneralService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.geofenceForm=this.fb.group({
      alert:['',Validators.required],
      deviceId:['',Validators.required],
      coinId:['',Validators.required]
    })

    this.refreshDevice()
    this.refreshCoin()
  }

  refreshCoin(){
    this.api.getCoinData().then((res:any)=>{
      console.log("coin submit====",res);
      this.coinData=[]
      if(res.status){
        this.coinData=res.success
      }
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
 
 refreshDevice(){

  this.api.getDeviceData().then((res:any)=>{
    this.deviceData=[]
    console.log("find submit====",res);
    if(res.status){
        this.deviceData=res.success
    }
  }).catch((err:any)=>{
    console.log("error===",err)
  })
}
  toggleAllSelectionDevice(formData){
    if(this.allSelected.selected){
      formData.controls.deviceId.patchValue([...this.deviceData.map(obj=>obj.deviceId),0])
    }
    else{
      formData.controls.deviceId.patchValue([])
    }
  }

  toggleAllSelectionCoin(formData){
    if(this.allSelected1.selected){
      formData.controls.coinId.patchValue([...this.coinData.map(obj=>obj.coinId),0])
    }
    else{
      formData.controls.coinId.patchValue([])
    }
  }

  submit(data){
 
    data.deviceObject=this.general.filterArray(data.deviceId)
    data.geoFenceSetting=this.general.filterArray(data.deviceId)
    console.log("geofence Data==",data)
    this.api.geofenceSetting(data).then((res:any)=>{
      if(res.status){
        console.log("geofence setting res==",res)
      }
    })

  }
  getGeofence(){
    this.api.getGeofenceSetting().then((res:any)=>{
      this.geoFenceData=[]
      if(res.status){
        console.log("geofence setting res==",res)
        this.geoFenceData=res.success
      }
    
    this.dataSource = new MatTableDataSource(this.geoFenceData);

      setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator
        })
    })
  }

  search(a){

  }
}

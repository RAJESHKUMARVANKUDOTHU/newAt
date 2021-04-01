import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-vehiclewisereport',
  templateUrl: './vehiclewisereport.component.html',
  styleUrls: ['./vehiclewisereport.component.css']
})
export class VehiclewisereportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  vehicleReportData: any
  vehicleName:any =[]
  deviceId:any=[]
  dataSource: any = [];
  displayedColumns1 = ['i', 'deviceId','deviceName', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns2 = ['i', 'deviceName', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns3 = ['i', 'deviceId', 'coinName', 'inTime', 'outTime', 'totTime'];
  constructor(
    public dialogRef: MatDialogRef<VehiclewisereportComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api: ApiService,
    public general: GeneralService,
  ) {
    this.vehicleReportData = data.data
    console.log("this.vehicleReportData ===",this.vehicleReportData )
  }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    var data = {}
    let from = moment(this.vehicleReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.vehicleReportData.toDate).format("YYYY-MM-DD")
    console.log(from,to);
    
    if (this.vehicleReportData.type == '1') {
      data={
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)

      this.api.genericReport(data).then((res: any) => {
        console.log("res 0==", res)
        if (res.status) {
          this.vehicleName = res.success
          for(let i =0;i<res.success.length;i++){
            res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.vehicleName);
          
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }
        
      }).catch(err=>{
        console.log("err===",err)
      })
    }

    
    if (this.vehicleReportData.type == '2') {
      data={
        deviceId:this.vehicleReportData.deviceId,
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)
      this.api.deviceIdReport(data).then((res: any) => {
        console.log("res 2==", res)
        this.deviceId = res.success
        for(let i =0;i<res.success.length;i++){
          res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
        }
        if (res.status) {
          this.dataSource = new MatTableDataSource(this.deviceId);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }

      }).catch(err=>{
        console.log("err===",err)
      })
    }
    if (this.vehicleReportData.type == '3') {
      data={
        deviceName:this.vehicleReportData.deviceName,
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)

      this.api.vehicleNameReport(data).then((res: any) => {
        console.log("res 3==", res)
        if (res.status) {
          this.vehicleName = res.success
          for(let i =0;i<res.success.length;i++){
            res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.vehicleName);
          
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }
        
      }).catch(err=>{
        console.log("err===",err)
      })
    }
    // if (this.vehicleReportData.type == '3') {
    //   data={
    //     coinId:this.vehicleReportData.coinId.coinId,
    //     fromDate:from,
    //     toDate:to,
    //     timeZoneOffset:this.general.getZone()
    //   }
    //   console.log("data to send==", data)
    //   this.api.getLocationReport(data).then((res: any) => {
    //     console.log("res==", res)
    //     if (res.status) {
    //       this.locationData = res.success
    //       for(let i =0;i<res.success.length;i++){
    //         res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
    //       }
    //       this.dataSource = new MatTableDataSource(this.locationData);

    //       setTimeout(() => {
    //         this.dataSource.sort = this.sort;
    //         this.dataSource.paginator = this.paginator
  
    //       })
    //     }
    //   }).catch(err=>{
    //     console.log("err===",err)
    //   })
    // }

    // if (this.vehicleReportData.type == '4') {
    //   data={
    //     zoneId:this.vehicleReportData.zoneId._id,
    //     fromDate:from,
    //     toDate:to,
    //     timeZoneOffset:this.general.getZone()
    //   }
    //   console.log("data to send==", data)
    //   this.api.getZoneWiseReport(data).then((res: any) => {
    //     console.log("res==", res)
    //     if (res.status) {
    //       this.zoneData = res.success
    //       for(let i =0;i<res.success.length;i++){
    //         res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
    //       }
    //       this.dataSource = new MatTableDataSource(this.zoneData);

    //       setTimeout(() => {
    //         this.dataSource.sort = this.sort;
    //         this.dataSource.paginator = this.paginator
  
    //       })
    //     }
    //   }).catch(err=>{
    //     console.log("err===",err)
    //   })
    // }
  }

  download(){
    var data = {}
    var fileName=''
    let from = moment(this.vehicleReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.vehicleReportData.toDate).format("YYYY-MM-DD")
    if (this.vehicleReportData.type == '0') {
      data={
        vehicleName:this.vehicleReportData.vehicleName,
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)
      fileName="Generic Repot"
      this.api.downloadGenericReport(data,fileName).then((res: any) => {
        console.log("res 1==", res)
        if (res.status) {
          this.deviceId = res.success
          this.dataSource = new MatTableDataSource(this.deviceId);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }

      }).catch(err=>{
        console.log("err===",err)
      })
    }
    if (this.vehicleReportData.type == '1') {
      data={
        vehicleName:this.vehicleReportData.vehicleName,
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      console.log("download data to send==", data)
      fileName="Report of vehicle name - "+this.vehicleReportData.vehicleName
      this.api.downloadvehicleNameReport(data,fileName).then((res: any) => {
        console.log("res 1==", res)
        if (res.status) {
          this.deviceId = res.success
          this.dataSource = new MatTableDataSource(this.deviceId);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }

      }).catch(err=>{
        console.log("err===",err)
      })
    }

    if (this.vehicleReportData.type == '2') {
      data={
        deviceId:this.vehicleReportData.deviceId,
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      fileName="Report of device Id - "+this.vehicleReportData.deviceId
      console.log("download data to send==", data)
      this.api.downloadDeviceIdReport(data,fileName).then((res: any) => {
        console.log("res 2==", res)
        if (res.status) {
          this.vehicleName = res.success
          this.dataSource = new MatTableDataSource(this.vehicleName);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }

      }).catch(err=>{
        console.log("err===",err)
      })
    }

    // if (this.vehicleReportData.type == '3') {
    //   data={
    //     coinId:this.vehicleReportData.coinId.coinId,
    //     fromDate:from,
    //     toDate:to,
    //     timeZoneOffset:this.general.getZone()
    //   }
    //   fileName="Report of location - "+this.vehicleReportData.coinId.coinName
    //   this.api.downloadLocationReport(data,fileName).then((res: any) => {
    //     console.log("res==", res)
    //     if (res.status) {
    //       this.locationData = res.success
    //       this.dataSource = new MatTableDataSource(this.locationData);

    //       setTimeout(() => {
    //         this.dataSource.sort = this.sort;
    //         this.dataSource.paginator = this.paginator
  
    //       })
    //     }
    //   }).catch(err=>{
    //     console.log("err===",err)
    //   })
    // }

    // if (this.vehicleReportData.type == '4') {
    //   data={
    //     zoneId:this.vehicleReportData.zoneId._id,
    //     fromDate:from,
    //     toDate:to,
    //     timeZoneOffset:this.general.getZone()
    //   }
    //   fileName="Report of zone Name - "+this.vehicleReportData.zoneId.zoneName
    //   this.api.downloadzoneWiseReport(data,fileName).then((res: any) => {
    //     console.log("res==", res)
    //     if (res.status) {
    //       this.zoneData = res.success
    //       this.dataSource = new MatTableDataSource(this.zoneData);

    //       setTimeout(() => {
    //         this.dataSource.sort = this.sort;
    //         this.dataSource.paginator = this.paginator
  
    //       })
    //     }
    //   }).catch(err=>{
    //     console.log("err===",err)
    //   })
    // }
  }
  search(a,data) {
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter =a.trim().toLowerCase()
    })
  }

}

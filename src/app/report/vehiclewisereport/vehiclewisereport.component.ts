import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
  vehicleName: any = []
  deviceId: any = []
  servicedVehicleData:any =[]
  dataSource: any = [];
  displayedColumns1 = ['i', 'deviceId', 'deviceName', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns2 = ['i', 'deviceName', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns3 = ['i', 'deviceId', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns4 = ['i', 'deviceName', 'totalTime'];
  limit:any=10
offset:any=0
currentPageLength:any=10
currentPageSize:any=10
  constructor(
    public dialogRef: MatDialogRef<VehiclewisereportComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api: ApiService,
    public general: GeneralService,
  ) {
    this.vehicleReportData = data.data
    console.log("this.vehicleReportData ===", this.vehicleReportData)
  }

  ngOnInit(): void {
    this.getData(this.limit,this.offset,this.vehicleReportData.type)
  }
  getData(limit=10,offset=0,type) {
    var data = {}
    this.vehicleReportData.type= type
    let from = moment(this.vehicleReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.vehicleReportData.toDate).format("YYYY-MM-DD")
    console.log(from, to);

    if (this.vehicleReportData.type == '1') {
      data = {
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone(),
        // limit:limit,
        // offset:offset
      }
      console.log("data to send==", data)

      this.api.genericReport(data).then((res: any) => {
        this.vehicleName=[]
        console.log("res 0==", res)
        if (res.status) {
          this.currentPageLength=parseInt(res.count)
          this.vehicleName = res.success
          for (let i = 0; i < res.success.length; i++) {
            res.success[i].totTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.vehicleName);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator

          })
        }

      }).catch(err => {
        console.log("err===", err)
      })
    }


    if (this.vehicleReportData.type == '2') {
      data = {
        deviceId: this.vehicleReportData.deviceId,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone(),
        // limit:limit,
        // offset:offset
      }
      console.log("data to send==", data)
      this.api.deviceIdReport(data).then((res: any) => {
        this.deviceId =[]
        console.log("res 2==", res)
        this.deviceId = res.success
        for (let i = 0; i < res.success.length; i++) {
          res.success[i].totTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
        }
        if (res.status) {
          this.dataSource = new MatTableDataSource(this.deviceId);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator

          })
        }

      }).catch(err => {
        console.log("err===", err)
      })
    }
    if (this.vehicleReportData.type == '3') {
      data = {
        deviceName: this.vehicleReportData.deviceName,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone(),
        // limit:limit,
        // offset:offset
      }
      console.log("data to send==", data)

      this.api.vehicleNameReport(data).then((res: any) => {
        this.vehicleName=[]
        console.log("res 3==", res)
        if (res.status) {
          this.vehicleName = res.success
          for (let i = 0; i < res.success.length; i++) {
            res.success[i].totTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.vehicleName);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator

          })
        }

      }).catch(err => {
        console.log("err===", err)
      })
    }

    if (this.vehicleReportData.type == '4') {
      data={ 
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone(),
        // limit:limit,
        // offset:offset
      }
      console.log("data to send==", data)
      this.api.getvehicleServicedReport(data).then((res: any) => {
        this.servicedVehicleData=[]
        console.log("res 4==", res)
        if (res.status) {
          this.servicedVehicleData = res.success
          for(let i =0;i<res.success.length;i++){
            res.success[i].totalTime=this.general.getTotTime(res.success[i].gateInTime,res.success[i].deRegTime)
            console.log("res.success[i].totalTime==",res.success[i].totalTime);
            
          }
          this.dataSource = new MatTableDataSource(this.servicedVehicleData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator

          })
        }
      }).catch(err=>{
        console.log("err===",err)
      })
    }
  }

  download() {
    var data = {}
    var fileName = ''
    let from = moment(this.vehicleReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.vehicleReportData.toDate).format("YYYY-MM-DD")
    if (this.vehicleReportData.type == '1') {
      data = {
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      console.log("data to send==", data)
      fileName = "Generic Repot"
      this.api.downloadGenericReport(data, fileName).then((res: any) => {
        console.log("res 1==", res)
        if (res.status) {
         this.general.openSnackBar("Downloading!!!",'')
        }

      }).catch(err => {
        console.log("err===", err)
      })
    }


    if (this.vehicleReportData.type == '2') {
      data = {
        deviceId: this.vehicleReportData.deviceId,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      fileName = "Report of device Id - " + this.vehicleReportData.deviceId
      console.log("download data to send==", data)
      this.api.downloadDeviceIdReport(data, fileName).then((res: any) => {
        console.log("res 2==", res)
        if (res.status) {
          this.general.openSnackBar("Downloading!!!",'')

        }

      }).catch(err => {
        console.log("err===", err)
      })
    }
    if (this.vehicleReportData.type == '3') {
      data = {
        deviceName: this.vehicleReportData.deviceName,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      console.log("download data to send==", data)
      fileName = "Report of vehicle name - " + this.vehicleReportData.deviceName
      this.api.downloadvehicleNameReport(data, fileName).then((res: any) => {
        console.log("res 1==", res)
        if (res.status) {
          this.general.openSnackBar("Downloading!!!",'')

        }

      }).catch(err => {
        console.log("err===", err)
      })
    }
  }

  getUpdate(event,type) {
    // console.log("paginator event",event);
    // console.log("paginator event length", this.currentPageLength);
    this.limit = event.pageSize
   this.offset = event.pageIndex*event.pageSize
    // console.log("limit==",limit,"offset==",offset)
    this.getData(this.limit,this.offset,type)
  }

  search(a, data) {
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = a.trim().toLowerCase()
    })
  }

}

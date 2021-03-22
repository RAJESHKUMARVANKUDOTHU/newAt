import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  generalReportData: any
  deviceId: any = []
  deviceName: any = []
  locationData: any = []
  zoneData: any = []
  dataSource: any = [];
  displayedColumns1 = ['i', 'deviceId', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns2 = ['i', 'deviceName', 'coinName', 'inTime', 'outTime', 'totTime'];
  displayedColumns3 = ['i', 'deviceId', 'deviceName', 'inTime', 'outTime', 'totTime'];
  displayedColumns4 = ['i', 'deviceId', 'deviceName', 'inTime', 'outTime', 'totTime'];

  constructor(
    public dialogRef: MatDialogRef<ReportViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api: ApiService,
    public general: GeneralService,
  ) {
    this.generalReportData = data.data
  }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    var data = {}
    let from = moment(this.generalReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.generalReportData.toDate).format("YYYY-MM-DD")
    if (this.generalReportData.type == '1') {
      data={
        deviceName:this.generalReportData.deviceName,
        fromDate:from,
        toDate:to,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)

      this.api.deviceNameReport(data).then((res: any) => {
        console.log("res 1==", res)
        if (res.status) {
          this.deviceName = res.success
          for(let i =0;i<res.success.length;i++){
            res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.deviceName);
          
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }
        
      }).catch(err=>{
        console.log("err===",err)
      })
    }
    
    if (this.generalReportData.type == '2') {
      data={
        deviceId:this.generalReportData.deviceId,
        fromDate:this.generalReportData.fromDate,
        toDate:this.generalReportData.toDate,
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

    if (this.generalReportData.type == '3') {
      data={
        coinId:this.generalReportData.coinId,
        fromDate:this.generalReportData.fromDate,
        toDate:this.generalReportData.toDate,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.locationData = res.success
          for(let i =0;i<res.success.length;i++){
            res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.locationData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }
      }).catch(err=>{
        console.log("err===",err)
      })
    }

    if (this.generalReportData.type == '4') {
      data={
        zoneId:this.generalReportData.zoneId._id,
        fromDate:this.generalReportData.fromDate,
        toDate:this.generalReportData.toDate,
        timeZoneOffset:this.general.getZone()
      }
      console.log("data to send==", data)
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.zoneData = res.success
          for(let i =0;i<res.success.length;i++){
            res.success[i].totTime=this.general.getTotTime(res.success[i].inTime,res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.zoneData);

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
  download(){
    var data = {}
    var fileName=''
    if (this.generalReportData.type == '1') {
      data={
        deviceName:this.generalReportData.deviceName,
        fromDate:this.generalReportData.fromDate,
        toDate:this.generalReportData.toDate,
        timeZoneOffset:this.general.getZone()
      }
      fileName="Report of -"+this.generalReportData.deviceName
      this.api.downloadDeviceNameReport(data,fileName).then((res: any) => {
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

    if (this.generalReportData.type == '2') {
      data={
        deviceId:this.generalReportData.deviceId,
        fromDate:this.generalReportData.from,
        toDate:this.generalReportData.to,
        timeZoneOffset:this.general.getZone()
      }
      fileName="Report of -"+this.generalReportData.deviceId
      this.api.downloadDeviceIdReport(data,fileName).then((res: any) => {
        console.log("res 2==", res)
        if (res.status) {
          this.deviceName = res.success
          this.dataSource = new MatTableDataSource(this.deviceName);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }

      }).catch(err=>{
        console.log("err===",err)
      })
    }

    if (this.generalReportData.type == '3') {
      data={
        coinId:this.generalReportData.coinId,
        fromDate:this.generalReportData.from,
        toDate:this.generalReportData.to,
        timeZoneOffset:this.general.getZone()
      }
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.locationData = res.success
          this.dataSource = new MatTableDataSource(this.locationData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
  
          })
        }
      }).catch(err=>{
        console.log("err===",err)
      })
    }

    if (this.generalReportData.type == '4') {
      data={
        zoneId:this.generalReportData.zoneId[0].zoneId._id,
        fromDate:this.generalReportData.from,
        toDate:this.generalReportData.to,
        timeZoneOffset:this.general.getZone()
      }
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.zoneData = res.success
          this.dataSource = new MatTableDataSource(this.zoneData);

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
  search(a,data) {
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter =a.trim().toLowerCase()
    })
  }
}


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
  selector: 'app-location-report',
  templateUrl: './location-report.component.html',
  styleUrls: ['./location-report.component.css']
})
export class LocationReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  locationReportData: any
  locationData: any = []
  dataSource: any = [];
  displayedColumns1 = ['i', 'deviceId', 'deviceName', 'inTime', 'outTime', 'totTime'];

  constructor(
    public dialogRef: MatDialogRef<LocationReportComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api: ApiService,
    public general: GeneralService,
  ) {
    this.locationReportData = data.data
    console.log("this.locationReportData ===", this.locationReportData)
  }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    var data = {}
    let from = moment(this.locationReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.locationReportData.toDate).format("YYYY-MM-DD")

    if (this.locationReportData.type == '1') {
      data = {
        coinId: this.locationReportData.coinId.coinId,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      console.log("data to send==", data)
      this.api.getLocationReport(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.locationData = res.success
          for (let i = 0; i < res.success.length; i++) {
            res.success[i].totTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.locationData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator

          })
        }
      }).catch(err => {
        console.log("err===", err)
      })
    }

  }

  download() {
    var data = {}
    var fileName = ''
    let from = moment(this.locationReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.locationReportData.toDate).format("YYYY-MM-DD")

    if (this.locationReportData.type == '1') {
      data = {
        coinId: this.locationReportData.coinId.coinId,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      fileName = "Report of location - " + this.locationReportData.coinId.coinName
      this.api.downloadLocationReport(data, fileName).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.locationData = res.success
          this.dataSource = new MatTableDataSource(this.locationData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator

          })
        }
      }).catch(err => {
        console.log("err===", err)
      })
    }

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

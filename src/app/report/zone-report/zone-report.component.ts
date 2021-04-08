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
  selector: 'app-zone-report',
  templateUrl: './zone-report.component.html',
  styleUrls: ['./zone-report.component.css']
})
export class ZoneReportComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  zoneReportData: any
  zoneData: any = []
  dataSource: any = [];
  displayedColumns1 = ['i', 'deviceId', 'deviceName', 'inTime', 'outTime', 'totTime'];

  constructor(
    public dialogRef: MatDialogRef<ZoneReportComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api: ApiService,
    public general: GeneralService,
  ) {
    this.zoneReportData = data.data
    console.log("this.zoneReportData ===", this.zoneReportData)
  }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    var data = {}
    let from = moment(this.zoneReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.zoneReportData.toDate).format("YYYY-MM-DD")

    if (this.zoneReportData.type == '1') {
      data = {
        zoneId: this.zoneReportData.zoneId._id,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      console.log("data to send==", data)
      this.api.getZoneWiseReport(data).then((res: any) => {
        this.zoneData =[]
        console.log("res==", res)
        if (res.status) {
          this.zoneData = res.success
          for (let i = 0; i < res.success.length; i++) {
            res.success[i].totTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.zoneData);

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
    let from = moment(this.zoneReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.zoneReportData.toDate).format("YYYY-MM-DD")

    if (this.zoneReportData.type == '1') {
      data = {
        zoneId: this.zoneReportData.zoneId._id,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      fileName = "Report of zone Name - " + this.zoneReportData.zoneId.zoneName
      this.api.downloadzoneWiseReport(data, fileName).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.general.openSnackBar("Downloading!!!",'')

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

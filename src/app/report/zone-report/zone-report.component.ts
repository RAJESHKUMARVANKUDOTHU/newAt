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
import * as CanvasJS from '../../../assets/canvasjs-3.2.7/canvasjs.min';

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
  avgTime: any = [];
  sdtTime: any = [];
  dataPoints:any=[]
  displayedColumns1 = ['i', 'deviceId', 'deviceName', 'inTime', 'outTime', 'totTime'];
  limit: any = 10
  offset: any = 0
  currentPageLength: any = 10
  currentPageSize: any = 10
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
    this.getData(10, 0, this.zoneReportData.type)
  }
  getData(limit, offset, type) {
    var data = {}
    let from = moment(this.zoneReportData.fromDate).format("YYYY-MM-DD")
    let to = moment(this.zoneReportData.toDate).format("YYYY-MM-DD")
    this.zoneReportData.type = type
    if (this.zoneReportData.type == '1') {
      data = {
        zoneId: this.zoneReportData.zoneId._id,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone(),
        limit: limit,
        offset: offset
      }
      console.log("data to send==", data)
      this.api.getZoneWiseReport(data).then((res: any) => {
        this.zoneData = []
        console.log("res==", res)
        if (res.status) {
          this.currentPageLength = parseInt(res.totalLength)

          this.zoneData = res.success
          for (let i = 0; i < res.success.length; i++) {
            res.success[i].totTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
          }
          this.dataSource = new MatTableDataSource(this.zoneData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator

          })
        }
      }).catch(err => {
        console.log("err===", err)
      })
    }

    if (this.zoneReportData.type == '2') {
      data = {
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone(),

      }
      console.log("data to send==", data)
      this.api.getZonePerformance(data).then((res: any) => {
        this.zoneData = []
        console.log("res 2==", res)
        if (res.status) {
          this.zoneData = res.success
          this.avgTime = []
          this.sdtTime = []
          for (let i = 0; i < this.zoneData.length; i++) {
            this.avgTime.push(
              {
                label: this.zoneData[i].zoneName,
                y: this.getTime(this.zoneData[i].totalAverageTime),
              }
            )
            this.sdtTime.push(
              {
                label: this.zoneData[i].zoneName,
                y: this.zoneData[i].standardTime
              }
            )
            this.zonePerformanceChart()
          }
        }
      }).catch(err => {
        console.log("err===", err)
      })
    }
    if (this.zoneReportData.type == '4') {
      data = {
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone(),

      }
      console.log("data to send==", data)
      this.api.zoneWiseEfficiency(data).then((res: any) => {
        this.zoneData = []
        console.log("res 2==", res)
        if (res.status) {
          this.zoneData = res.success
          this.dataPoints=[]
          for (let i = 0; i < this.zoneData.length; i++) {
            this.dataPoints.push(
              {
                label: this.zoneData[i].zoneName,
                y: this.getTime(this.zoneData[i].zoneWiseEfficiency),
              }
            )
          
            this.zoneEfficiencyChart()
          }
        }
      }).catch(err => {
        console.log("err===", err)
      })
    }
 
  }

  getTime(data) {
    let min = Math.floor(data / (1000 * 60))
    return min
  }
  zonePerformanceChart() {
    var chart = null
    chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Zone Performance",
        fontSize: 25,
      },
      axisX: {
        title: "Zone",
        labelMaxWidth: 120,
      },
      axisY: {
        title: "Avg. time (in minutes)",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
        gridThickness: 0,
        includeZero: true
      },
      axisY2: {
        title: "Zone Standard time (in minutes)",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E",
        gridThickness: 0,
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      dataPointWidth: 60,
      data: [{
        type: "column",
        name: "Actual Avg. time",
        indexLabelPlacement: "outside",
        indexLabel: "{y}",
        showInLegend: true,
        yValueFormatString: "#,##0#\" min\"",
        dataPoints: this.avgTime
      },
      {
        type: "column",
        name: "Standard time",
        indexLabelPlacement: "outside",
        indexLabel: "{y}",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0#\" min\"",
        dataPoints: this.sdtTime
      }]
    });
    chart.render();
    chart.axisY2[0].set("minimum", chart.axisY[0].get("minimum"), false);
    chart.axisY2[0].set("maximum", chart.axisY[0].get("maximum"));
    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }
zoneEfficiencyChart(){
  var chart = null

    chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Zone Efficiency",
        fontColor: "#002060",
      },
      axisY: {
        title: "Efficiency (in %)",
        gridThickness: 0,
      },
      axisX: {
        title: "Zone"
      },
      dataPointWidth: 30,
      data: [{
        type: "column",
        dataPoints: this.dataPoints,
        yValueFormatString: "#,##0#\" %\"",
      }]
    });

    chart.render();
    chart.destroy()
    chart = null;
    chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Zone Efficiency",
        fontColor: "#002060",
      },
      axisY: {
        title: "Zone Efficiency(in %)",
        gridThickness: 0,
        interval: 500
      },
      axisX: {
        title: "Zone"
      },
      dataPointWidth: 30,
      data: [{
        type: "column",
        dataPoints: this.dataPoints,
        yValueFormatString: "#,##0#\" %\"",
      }]
    });
    chart.render();
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
          this.general.openSnackBar("Downloading!!!", '')

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
  getUpdate(event, type) {

    this.limit = event.pageSize
    this.offset = event.pageIndex * event.pageSize
    this.getData(this.limit, this.offset, type)
  }

}

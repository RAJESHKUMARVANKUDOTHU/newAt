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
import * as CanvasJS from '../../../assets/canvasjs-3.2.7/canvasjs.min';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
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
  bayData: any = []
  bayDataTemp: any = []
  dataSource: any = [];
  dataPoints: any = []
  displayedColumns1 = ['i', 'deviceId', 'deviceName', 'inTime', 'outTime', 'totTime'];
  displayedColumns2 = ['i', 'coinName', 'count', 'avgTime'];

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
    if(this.locationReportData.type == '2'){

      this.averageTimeOfBayGraph()
    }
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
        this.locationData = []
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

    if (this.locationReportData.type == '2') {
      data = {
        zoneId: this.locationReportData.zoneId._id,
        fromDate: from,
        toDate: to,
        timeZoneOffset: this.general.getZone()
      }
      console.log("data to send==", data)
      this.api.getAverageTimeOfBays(data).then((res: any) => {
        this.bayData = []
        console.log("res 2==", res)
        if (res.status) {

        }
        this.dataSource = new MatTableDataSource(this.bayData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
        })

      }).catch(err => {
        console.log("err===", err)
      })
    }
  }

  averageTimeOfBayGraph(){
    var y=[100,200,300,400]
    var x=[100,200,300,400]
    var chart=null
  for(let i=0;i<y.length;i++){
    this.dataPoints.push(
      {
        label: x[i],
        y: y[i]
      }
    )
  }
     chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Average time taken by bays",
        fontColor: "#002060",
      },
      axisY: {
        gridThickness: 0
      },
      dataPointWidth: 30,
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
    chart.destroy()
    chart = null;
    chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Average time taken by bays",
        fontColor: "#002060",
      },
      axisY: {
        gridThickness: 0
      },
      dataPointWidth: 30,
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });
    chart.render();
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
          this.general.openSnackBar("Downloading!!!", '')

        }
      }).catch(err => {
        console.log("err===", err)
      })
    }

  }
  groupData(data) {
    return data.reduce((group, obj) => {
      const name = obj.coinName
      if (!group[name]) {
        group[name] = []
      }
      group[name].push(obj)
      return group
    }, {})

  }


  // avgTime(data){

  //     let time=[]
  //     let totTime=0
  //     let a={}
  //      data.filter((obj,index)=>{
  //       var ms=this.getTotTime(obj.inTime,obj.outTime)       
  //       time[index]= ms
  //     })
  //      totTime=time.reduce((a,b)=>{
  //       return  a+b
  //     },0)
  //     return totTime!=0?Math.floor(totTime/data.length):0
  // }
  //   getTotTime(inTime,outTime){
  //     // console.log("time===",inTime,outTime)
  //     this.date1 = new Date(inTime)
  //     this.date2 = outTime == null || outTime == '-' ? new Date() : new Date(outTime)
  //     // console.log("time2===",this.date1, this.date2)
  //     if (this.date1 != "Invalid Date") {
  //       if (this.date2 != "Invalid Date") {
  //         var diff = Math.abs(this.date2 - this.date1)
  //         let ms = diff % 1000;
  //         return ms
  //       }

  //   } 
  // }  
  // getTime(data){
  //   let h= Math.floor(data/3600)
  //   data%=3600
  //   let m = Math.floor(data/60)
  //    let s=data%60
  //    let ss = s <= 9 && s >= 0 ? "0" + s : s;
  //    let mm = m <= 9 && m >= 0 ? "0" + m : m;
  //    let hh = h <= 9 && h >= 0 ? "0" + h : h;

  //    var time = hh + ':' + mm + ':' + ss
  //    return this.general.convertTime(time)
  // }
  search(a, data) {
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = a.trim().toLowerCase()
    })
  }

}

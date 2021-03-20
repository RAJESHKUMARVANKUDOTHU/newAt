import { Component, OnInit, Inject } from '@angular/core';
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
  generalReportData: any
  deviceId: any = []
  deviceName: any = []
  locationData: any = []
  zoneData: any = []
  constructor(
    public dialogRef: MatDialogRef<ReportViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api: ApiService,
    public general: GeneralService,
  ) {
    this.generalReportData = data.data
  }

  ngOnInit(): void {
  }
  getData() {
    var data = {}
    if (this.generalReportData.type == '1') {
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.deviceId = res.success
        }

      })
    }

    if (this.generalReportData.type == '2') {
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.deviceName = res.success
        }

      })
    }

    if (this.generalReportData.type == '3') {
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.locationData = res.success
        }
      })
    }

    if (this.generalReportData.type == '4') {
      this.api.setRange(data).then((res: any) => {
        console.log("res==", res)
        if (res.status) {
          this.zoneData = res.success
        }
      })
    }
  }
}


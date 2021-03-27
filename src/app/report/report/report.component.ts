import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoginAuthService } from '../../services/login-auth.service';
import { GeneralService } from '../../services/general.service'
import { ReportViewComponent } from '../../report/report-view/report-view.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  genericReport: FormGroup
  customReport: FormGroup
  deviceData: any = []
  coinData: any = []
  zoneData: any = []
  constructor(
    private fb: FormBuilder,
    private login: LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.genericReport = this.fb.group({
      type: ['', Validators.required],
      days: [''],
      deviceId: [''],
      deviceName: [''],
      zoneId: [''],
      coinId: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    },
      {
        validators: this.formValidate()
      })
    this.customReport = this.fb.group({
      type: ['', Validators.required],
      days: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    })
    this.patchGenricDate()
    this.patchCustomDate()
    this.refreshCoin()
    this.refreshDevice()
    this.getZoneDetails()
  }

  patchGenricDate() {
    this.genericReport.get('days').valueChanges.subscribe((value) => {
      var date = new Date()
      date.setDate(date.getDate() - parseInt(value));
      this.genericReport.controls['fromDate'].patchValue((date));
    });
    this.genericReport.get('days').valueChanges.subscribe(() => {
      var date = new Date()
      date.setDate(date.getDate());
      this.genericReport.controls['toDate'].patchValue((date));
    });
  }

  patchCustomDate() {

    this.customReport.get('days').valueChanges.subscribe((value) => {
      var date = new Date()
      date.setDate(date.getDate() - parseInt(value));
      this.customReport.controls['fromDate'].patchValue((date));
    });
    this.customReport.get('days').valueChanges.subscribe(() => {
      var date = new Date()
      date.setDate(date.getDate());
      this.customReport.controls['toDate'].patchValue((date));
    });
  }


  refreshCoin() {
    this.api.getCoinData().then((res: any) => {

      console.log("coin submit====", res);
      this.coinData = []
      if (res.status) {
        this.coinData = res.success
      }
      else {
        this.coinData = []
      }

    }).catch((err: any) => {
      console.log("error===", err)
    })
  }

  refreshDevice() {

    this.api.getDeviceData().then((res: any) => {

      this.deviceData = []
      console.log("find submit====", res);
      if (res.status) {
        this.deviceData = res.success
      }
      else {
        this.deviceData = []
      }

    }).catch((err: any) => {
      console.log("error===", err)
    })
  }


  getZoneDetails() {
    this.api.getZone().then((res: any) => {

      console.log("zone details response==", res)
      this.zoneData = []
      if (res.status) {
        this.zoneData = res.success
      }
      else {
        this.zoneData = []
      }
    })
  }
  formValidate() {

    return (formGroup: FormGroup) => {
      const type = formGroup.get('type');
      if(formGroup.get('type').value != ''){
      if (type.value == "1") {
        if (formGroup.get('deviceName').value != '') {
          formGroup.get('coinId').setErrors(null)
          formGroup.get('deviceId').setErrors(null)
          formGroup.get('zoneId').setErrors(null)
          formGroup.get('deviceName').setErrors(null)
          return
        }
        else {
          formGroup.get('deviceName').setErrors(
            {
              required: true
            })
          return
        }
      }

      if (type.value == "2") {
        if (formGroup.get('deviceId').value != '') {
          formGroup.get('coinId').setErrors(null)
          formGroup.get('deviceName').setErrors(null)
          formGroup.get('zoneId').setErrors(null)
          formGroup.get('deviceId').setErrors(null)
          return
        }
        else {
          formGroup.get('deviceId').setErrors(
            {
              required: true
            })
          return
        }
      }
      if (type.value == "3") {
        if (formGroup.get('coinId').value != '') {
          formGroup.setErrors(null)

          // formGroup.get('deviceName').setErrors(null)
          // formGroup.get('deviceId').setErrors(null)
          // formGroup.get('zoneId').setErrors(null)
          // formGroup.get('coinId').setErrors(null)
          return
        }
        else {
          formGroup.get('coinId').setErrors(
            {
              required: true
            })
          return
        }
      }

      if (type.value == "4") {
        if (formGroup.get('zoneId').value != '') {
          formGroup.setErrors(null)
        // formGroup.get('coinId').setErrors(null)
        // formGroup.get('deviceId').setErrors(null)
        // formGroup.get('deviceName').setErrors(null)
          formGroup.get('zoneId').setErrors(null)
          return
        }
        else {
          formGroup.get('zoneId').setErrors(
            {
              required: true
            })
          return
        }
      }
     }

  }
}

  onsubmitGenericReport(data) {
    console.log("generic data==", data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '90vh';
    dialogConfig.width = '90vw';
    dialogConfig.data = {
      data: data
    }
    const dialogRef = this.dialog.open(ReportViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {})

  }
  onsubmitCustomReport(data) {
    console.log("custom data==", data)
    data = this.general.encrypt(data)

  }

}

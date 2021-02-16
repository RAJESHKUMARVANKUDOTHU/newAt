import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingInfoComponent } from '../setting-info/setting-info.component';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  @ViewChild('allSelected') private allSelected: MatOption
  @ViewChild('allSelected1') private allSelected1: MatOption
  @ViewChild('allSelected2') private allSelected2: MatOption
  @ViewChild('allSelected3') private allSelected3: MatOption
  @ViewChild('allSelected4') private allSelected4: MatOption
  @ViewChild('allSelected5') private allSelected5: MatOption
  @ViewChild('allSelected6') private allSelected6: MatOption

  dateTimeForm: FormGroup
  distanceForm: FormGroup
  timeDelay: FormGroup
  inactivityFind: FormGroup
  inactivityCoin: FormGroup
  groupCoinForm: FormGroup
  coinCategory: FormGroup
  zoneForm: FormGroup
  maxFindForm: FormGroup
  groupRegister: FormGroup
  createServiceType:FormGroup
  feetValue: any = [25, 50, 75, 100]
  coinData: any = []
  deviceData: any = []
  groupData: any = []
  name: any
  zoneData: any
  constructor(
    private fb: FormBuilder,
    private login: LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.refreshDevice()
    this.refreshCoin()
    this.refreshSetting()
    this.getZoneDetails()
    this.getGroups()
  }
  createForm() {
    // this.dateTimeForm=this.fb.group({
    //   dateTimeFormat:['',Validators.required]
    // })

    this.distanceForm = this.fb.group({
      range: ['', Validators.required]
    })

    this.timeDelay = this.fb.group({
      deviceId: ['', Validators.required],
      timeDelay: ['', Validators.required],

    })

    this.inactivityFind = this.fb.group({
      deviceId: ['', Validators.required],
      inactivityTime: ['', Validators.required],
      alert: ['', Validators.required]
    })


    this.inactivityCoin = this.fb.group({
      coinId: ['', Validators.required],
      inactivityTime: ['', Validators.required],
      alert: ['', Validators.required]
    })

    this.groupRegister = this.fb.group({
      groupName: ['', Validators.required]
    })


    this.groupCoinForm = this.fb.group({
      coinId: ['', Validators.required],
      groupId: ['', Validators.required],

    })

    this.coinCategory = this.fb.group({
      coinId: ['', Validators.required],
      zoneId: ['', Validators.required],

    })

    this.zoneForm = this.fb.group({
      zoneName: ['', Validators.required],
      standardTime: ['', Validators.required]
    })

    this.maxFindForm = this.fb.group({
      coinId: ['', Validators.required],
      maxFindAsset: ['', Validators.required],
    })

    this.createServiceType = this.fb.group({
      zoneId:['',Validators.required],
      serviceName:['',Validators.required]
    })
  }

  refreshSetting() {
    this.api.refreshSettings().then((res: any) => {

      console.log("refresh Settings====", res);
      if (res.status) {
      }
      else {
      }

    }).catch((err: any) => {
      console.log("error===", err)
    })
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


  // onSubmitDateTime(data){
  //   console.log("data===",data)
  //   try{
  //     if(this.dateTimeForm.valid){
  //       this.api.dateTimeFormat(data).then((res:any)=>{
  //         console.log("dateTimeFormat res===",res)
  //         if(res.status){
  //           this.general.openSnackBar('Date Time Format updated Successfully','')
  //           this.dateTimeForm.reset()
  //         }
  //       }).catch((err)=>{
  //         console.log("err=",err)
  //       })
  //     }

  //   }
  //   catch(error){
  //     console.log("error==",error)
  //   }
  // }

  onSubmitDistanceForm(data) {
    console.log("data===", data)

    try {
      if (this.distanceForm.valid) {

        this.api.setRange(data).then((res: any) => {

          console.log("range res===", res)
          if (res.status) {
            this.distanceForm.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }

  }

  onSubmitTimeDelay(data) {
    data.deviceId = this.general.filterArray(data.deviceId)
    console.log("onSubmitTimeDelay data==", data)

    try {
      if (this.timeDelay.valid) {
        this.api.timeDelay(data).then((res: any) => {

          console.log("timeDelay res===", res)
          if (res.status) {
            this.timeDelay.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }

  }

  onSubmitInactivityFind(data) {
    data.deviceId = this.general.filterArray(data.deviceId)

    try {
      if (this.inactivityFind.valid) {
        data.sms = data.alert == 'sms' ? true : false
        data.email = data.alert == 'email' ? true : false
        console.log("onSubmitInactivityFind data==", data)
        this.api.deviceInactivity(data).then((res: any) => {

          console.log("inactivity find res===", res)
          if (res.status) {
            this.inactivityFind.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }

        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }


    }
    catch (error) {
      console.log("error==", error)
    }

  }

  onSubmitInactivityCoin(data) {
    data.coinId = this.general.filterArray(data.coinId)
    console.log("onSubmitInactivityCoin data==", data)
    data.sms = data.alert == 'sms' ? true : false
    data.email = data.alert == 'email' ? true : false
    try {
      if (this.inactivityCoin.valid) {
        this.api.coinInactivity(data).then((res: any) => {

          console.log("inactivity coin res===", res)
          if (res.status) {
            this.inactivityCoin.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }

  }

  onSubmitMaxFindForm(data) {
    data.coinId = this.general.filterArray(data.coinId)
    console.log("onSubmitMaxFindForm data==", data)

    try {
      if (this.maxFindForm.valid) {
        this.api.updateMaxFind(data).then((res: any) => {

          console.log("max find res===", res)
          if (res.status) {
            this.maxFindForm.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }
  }

  onSumbitCoinCategory(data) {
    data.coinId = this.general.filterArray(data.coinId)
    console.log("onSumbitCoinCategory data==", data)

    try {
      if (this.coinCategory.valid) {
        this.api.zoneConfiguration(data).then((res: any) => {

          console.log("zone setting res===", res)
          if (res.status) {
            this.coinCategory.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }


  }

  onSubmitZoneForm(data) {
    console.log("onSubmitZoneForm data==", data)

    try {
      if (this.zoneForm.valid) {
        this.api.zoneSetting(data).then((res: any) => {

          console.log("zone setting res===", res)
          if (res.status) {
            this.zoneForm.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }


  }

  onSubmitGroup(data) {
    console.log("onSubmitZoneForm data==", data)

    try {
      if (this.groupRegister.valid) {
        this.api.groupRegister(data).then((res: any) => {

          console.log("Group register res===", res)
          if (res.status) {
            this.groupRegister.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }
  }

  onSubmitGroupCoinForm(data) {
    data.coinId = this.general.filterArray(data.coinId)

    console.log("onSubmitGroupCoinForm data==", data)
    try {
      if (this.groupCoinForm.valid) {
        this.api.updateGroup(data).then((res: any) => {

          console.log("Group coin res===", res)
          if (res.status) {
            this.groupCoinForm.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }
  }

  onSubmitServiceType(data) {
    data.zoneId = this.general.filterArray(data.zoneId)

    console.log("onSubmitServiceTye data==", data)
    try {
      if (this.createServiceType.valid) {
        this.api.createServiceType(data).then((res: any) => {

          console.log("Group coin res===", res)
          if (res.status) {
            this.createServiceType.reset()
            this.general.openSnackBar(res.success, '')
          }
          else { }
        }).catch((err) => {
          console.log("err=", err)
        })
      }
      else { }
    }
    catch (error) {
      console.log("error==", error)
    }
  }

  toggleAllSelectionDevice(formData) {
    if (this.allSelected.selected) {
      formData.controls.deviceId.patchValue([...this.deviceData.map(obj => obj.deviceId), 0])
    }
    else {
      formData.controls.deviceId.patchValue([])
    }
  }

  toggleAllSelectionCoins(formData) {
    if (this.allSelected1.selected) {
      formData.controls.coinId.patchValue([...this.coinData.map(obj => obj.coinId), 0])
    }
    else {
      formData.controls.coinId.patchValue([])
    }
  }

  toggleAllSelectionDevice2(formData) {
    if (this.allSelected2.selected) {
      formData.controls.deviceId.patchValue([...this.deviceData.map(obj => obj.deviceId), 0])
    }
    else {
      formData.controls.deviceId.patchValue([])
    }
  }


  toggleAllSelectionCoin(formData) {

    if (this.allSelected3.selected) {
      formData.controls.coinId.patchValue([...this.coinData.map(obj => obj.coinId), 0])
    }
    else {
      formData.controls.coinId.patchValue([])
    }
  }
  toggleAllSelectionCoin1(formData) {

    if (this.allSelected4.selected) {
      formData.controls.coinId.patchValue([...this.coinData.map(obj => obj.coinId), 0])
    }
    else {
      formData.controls.coinId.patchValue([])
    }
  }

  toggleAllSelectionCoin2(formData) {
    if (this.allSelected5.selected) {
      formData.controls.coinId.patchValue([...this.coinData.map(obj => obj.coinId), 0])
    }
    else {
      formData.controls.coinId.patchValue([])
    }
  }

  toggleAllSelectionZone(formData) {
    if (this.allSelected6.selected) {
      formData.controls.zoneId.patchValue([...this.zoneData.map(obj => obj.zoneId), 0])
    }
    else {
      formData.controls.zoneId.patchValue([])
    }
  }

  openInfo(data) {
    console.log("data==", data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type: data
    }
    const dialogRef = this.dialog.open(SettingInfoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });
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

  getGroups() {
    this.api.getGroup().then((res: any) => {

      console.log("group details response==", res)
      this.groupData = []
      if (res.status) {
        this.groupData = res.success
      }
      else {
        this.groupData = []
      }
    })
  }
}

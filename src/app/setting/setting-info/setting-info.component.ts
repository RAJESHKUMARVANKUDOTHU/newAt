import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoginAuthService } from '../../services/login-auth.service';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.css'],
})
export class SettingInfoComponent implements OnInit {
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  type: any
  coinData: any = []
  deviceData: any = []
  zoneData: any = []
  groupData: any = []
  groupNotNull: any = []
  form1: FormGroup
  form2: FormGroup
  form3: FormGroup
  form4: FormGroup
  // timeDelay: FormGroup
  // inactivityFind: FormGroup
  // inactivityCoin: FormGroup
  // groupCoinForm: FormGroup
  // coinCategory: FormGroup
  // zoneForm: FormGroup
  // maxFindForm: FormGroup
  // groupRegister: FormGroup
  // createServiceType:FormGroup
  // dataSource: any = []
  // dataSource1: any = []
  // dataSource2: any = []
  // dataSource3: any = []
  // dataSource4: any = []
  serviceData: any = []
  // timeDelay = ['deviceId', 'timeDelay','delete']
  // findInactivityTime = ['deviceId', 'inActivityTime', 'inactivitySMS', 'inactivityEmail','delete']
  // coinInactivityTime = ['coinId', 'inActivityTime', 'sms', 'email','delete']
  // coinConfig = ['coinId', 'zoneName','delete']
  // zoneCategory = ['zoneName', 'standardTime','delete']
  // groupInfo = ['i', 'groupName','delete']
  // coinGroup = ['coinId', 'coinName', 'groupId','delete']
  // maxFind =  ['coinId', 'coinName', 'maxFindAsset','delete']
  // servicetype = [ 'serviceName','zoneId','delete']
  constructor(
    public dialogRef: MatDialogRef<SettingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private login: LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
    private fb: FormBuilder,
  ) {
    this.type = data.type;
  }

  ngOnInit(): void {
    this.loadData();
    this.form1 = this.fb.group({
      items: this.fb.array([])
    });
    this.form2 = this.fb.group({
      items: this.fb.array([])
    });
    this.form3 = this.fb.group({
      items: this.fb.array([])
    });
    this.form4 = this.fb.group({
      items: this.fb.array([])
    });
    // this.inactivityCoin = this.fb.group({
    //   items:this.fb.array([])
    // }); 
    // this.maxFindForm = this.fb.group({
    //   items:this.fb.array([])
    // }); 
    //  this.coinCategory = this.fb.group({
    //   items:this.fb.array([])
    // });  
    // this.groupCoinForm = this.fb.group({
    //   items:this.fb.array([])
    // });
    //   this.zoneForm = this.fb.group({
    //   items:this.fb.array([])
    // });
    // this.createServiceType = this.fb.group({
    //   items:this.fb.array([])
    // });
  }
  loadData() {
    if (this.type == 'timeDelay' || this.type == 'find-inactive') {
      this.refreshDevice()
    }
    else if (this.type == 'coin' || this.type == 'coin-cat' || this.type == 'coinGrp' || this.type == 'max-find') {
      this.refreshCoin()
    }
    else if (this.type == 'groupName') {
      this.getGroups()
    }
    else if (this.type == 'serviceType') {
      this.getServiceDetails()
    }
    else {
      this.getZoneDetails()
    }
  }


  refreshCoin() {
    this.api.getCoinData().then((res: any) => {
      console.log("coin submit====", res);
      this.coinData = []
      // this.dataSource = []
      const control = <FormArray>this.form1.controls.items;
      control.controls = [];
      if (res.status) {
        this.coinData = res.success
        this.groupNotNull = this.coinData.filter(obj => {
          return obj.groupid != 'null';
        })
        for (let i = 0; i < this.coinData.length; i++) {
          control.push(this.fb.group(
            {
              coinId: [res.success[i].coinId],
              coinName: [res.success[i].coinName],
              gatewayId: [res.success[i].gatewayId],
              groupId: [res.success[i].groupId != null ? res.success[i].groupId.groupName : '-'],
              maxFindAsset: [res.success[i].maxFindAsset],
              sms: [res.success[i].inactivityAlert.sms],
              email: [res.success[i].inactivityAlert.email],
              zoneName: [res.success[i].zoneId],
              inActivityTime: [res.success[i].inActivityTime],

            }
          ));
        }
      }

      else { }

    }).catch((err: any) => {
      console.log("error===", err)
    })

  }
  refreshDevice() {
    this.api
      .getDeviceData()
      .then((res: any) => {
        this.deviceData = [];
        // this.dataSource1 = [];
        const control = <FormArray>this.form2.controls.items;
        control.controls = [];
        console.log('find submit====', res);
        if (res.status) {
          this.deviceData = res.success
          for (let i = 0; i < this.deviceData.length; i++) {
            control.push(this.fb.group(
              {
                deviceId: [res.success[i].deviceId],
                deviceName: [res.success[i].deviceName],
                distance: [res.success[i].distance],
                sms: [res.success[i].sms == false ? 'N' : 'Y'],
                email: [res.success[i].email == false ? 'N' : 'Y'],
                inActivityTime: [res.success[i].inActivityTime],
                inactivityAlert: [res.success[i].inactivityAlert],
                inactivitySMS: [res.success[i].inactivityAlert.length ? res.success[i].inactivityAlert[0].sms : ''],
                inactivityEmail: [res.success[i].inactivityAlert.length ? res.success[i].inactivityAlert[1].email : ''],
                timeDelay: [res.success[i].timeDelay],

              }
            ));
          }
        }
        else { }
      }).catch((err: any) => {
        console.log("error===", err)
      })
  }

  getZoneDetails() {
    this.api.getZone().then((res: any) => {
      console.log('zone details response==', res);
      this.zoneData = [];
      // this.dataSource2 = [];
      if (res.status) {
        this.zoneData = res.success;
        // this.dataSource2 = new MatTableDataSource(this.zoneData);
        // setTimeout(() => {
        //   this.dataSource2.sort = this.sort;
        //   this.dataSource2.paginator = this.paginator;
        // });
      }
      else { }

    })
  }

  getGroups() {
    this.api.getGroup().then((res: any) => {
      console.log("group details response==", res)
      this.groupData = []
      if (res.status) {
        this.groupData = res.success
        // this.dataSource3 = new MatTableDataSource(this.groupData);
        // setTimeout(() => {
        //   this.dataSource3.sort = this.sort;
        //   this.dataSource3.paginator = this.paginator
        // })
      }
      else { }
    })
  }

  getServiceDetails() {
    this.api.getServiceType().then((res: any) => {
      console.log("service details response==", res)
      this.serviceData = []
      if (res.status) {
        this.serviceData = res.success
        // this.dataSource4 = new MatTableDataSource(this.serviceData);
        // setTimeout(() => {
        //   this.dataSource4.sort = this.sort;
        //   this.dataSource4.paginator = this.paginator
        // })
      }
      else { }
    })
  }
  submit(data) {
    console.log("submit data==", data);

  }
  delete(data) {
    console.log("delete data==", data);

  }

}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.css'],
})
export class SettingInfoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  type: any
  coinData: any = []
  deviceData: any = []
  zoneData: any = []
  groupData: any = []
  dataSource: any = []
  dataSource1: any = []
  dataSource2: any = []
  dataSource3: any = []
  dataSource4: any = []
  serviceData: any = []
  timeDelay = ['deviceId', 'timeDelay']
  findInactivityTime = ['deviceId', 'inActivityTime', 'inactivitySMS', 'inactivityEmail']
  coinInactivityTime = ['coinId', 'inActivityTime', 'sms', 'email']
  coinConfig = ['coinId', 'zoneName']
  zoneCategory = ['zoneName', 'standardTime']
  groupInfo = ['i', 'groupName']
  coinGroup = ['coinId', 'coinName', 'groupId']
  maxFind =  ['coinId', 'coinName', 'maxFindAsset']
  servicetype = ['zoneId', 'zoneName', 'serviceName']
  constructor(
    public dialogRef: MatDialogRef<SettingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private login: LoginAuthService,
    private api: ApiService,
    private general: GeneralService
  ) {
    this.type = data.type;
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    if (this.type == 'timeDelay' || this.type == 'find-inactive' ) {
      this.refreshDevice()
    }
    else if (this.type == 'coin' || this.type == 'coin-cat' || this.type == 'coinGrp' || this.type == 'max-find') {
      this.refreshCoin()
    }
    else if (this.type == 'groupName') {
      this.getGroups()
    }
    else if(this.type == 'serviceType' ){
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
      this.dataSource = []
      if (res.status) {
        for (let i = 0; i < res.success.length; i++) {
          this.coinData.push({
            coinId: res.success[i].coinId,
            coinName: res.success[i].coinName,
            gatewayId: res.success[i].gatewayId,
            groupId: res.success[i].groupId,
            maxFindAsset:res.success[i].maxFindAsset,
            sms:  res.success[i].inactivityAlert.length ? res.success[i].inactivityAlert[0].sms == false ? 'N' : res.success[i].inactivityAlert[0].sms == null ? '-' : 'Y' : '-',
            email:  res.success[i].inactivityAlert.length ? res.success[i].inactivityAlert[1].email == false ? 'N' : res.success[i].inactivityAlert[1].email == null ? '-' : 'Y' : '-',
            zoneName: res.success[i].zoneId,
            inactivityTime: res.success[i].inactivityTime
          })
          this.dataSource = new MatTableDataSource(this.coinData);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator
          })
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
        this.dataSource1 = [];
        console.log('find submit====', res);
        if (res.status) {
          for (let i = 0; i < res.success.length; i++) {
            this.deviceData.push({

              deviceId: res.success[i].deviceId,
              deviceName: res.success[i].deviceName,
              distance: res.success[i].distance,
              sms: res.success[i].sms == false ? 'N' : 'Y',
              email: res.success[i].email == false ? 'N' : 'Y',
              inActivityTime: res.success[i].inActivityTime,
              inactivitySMS: res.success[i].inactivityAlert.length ? res.success[i].inactivityAlert[0].sms == false ? 'N' : res.success[i].inactivityAlert[0].sms == null ? '-' : 'Y' : '-',
              inactivityEmail: res.success[i].inactivityAlert.length ? res.success[i].inactivityAlert[1].email == false ? 'N' : res.success[i].inactivityAlert[1].email == null ? '-' : 'Y' : '-',
              timeDelay: res.success[i].timeDelay,

            })
          }
          this.dataSource1 = new MatTableDataSource(this.deviceData);
          setTimeout(() => {
            this.dataSource1.sort = this.sort;
            this.dataSource1.paginator = this.paginator
          })

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
      this.dataSource2 = [];
      if (res.status) {
        this.zoneData = res.success;
        this.dataSource2 = new MatTableDataSource(this.zoneData);
        setTimeout(() => {
          this.dataSource2.sort = this.sort;
          this.dataSource2.paginator = this.paginator;
        });
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
        this.dataSource3 = new MatTableDataSource(this.groupData);
        setTimeout(() => {
          this.dataSource3.sort = this.sort;
          this.dataSource3.paginator = this.paginator
        })
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
        this.dataSource4 = new MatTableDataSource(this.serviceData);
        setTimeout(() => {
          this.dataSource4.sort = this.sort;
          this.dataSource4.paginator = this.paginator
        })
      }
      else { }
    })
  }
}

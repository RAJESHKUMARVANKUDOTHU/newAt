import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { LoginAuthService } from './login-auth.service';
import * as CryptoJS from 'crypto-js';
import { HttpResponse } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public encryptInfo;
  public decryptedInfo;
  public token;
  public mismatch: boolean
  public date1: any
  public date2: any
  public loadingFreez: BehaviorSubject<any> = new BehaviorSubject<any>([])
  public deviceChanges = new Subject<any>();
  public userData = new Subject<any>();
  isMobile: boolean;
  isTablet: boolean;
  isDesktopDevice: boolean;
  constructor(
    private _snackBar: MatSnackBar,
    private login: LoginAuthService,
    private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    // this.token = this.login.getLoginDetails().token
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  filterArray(array) {
    array = array.filter((obj) => {
      return obj != 0
    })
    return array
  }

  filterIds(array) {
    let arr = []
    array.filter((obj) => {
      arr.push(
        obj.coinId
      )
    })
    return arr
  }
  setObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getObject(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  updateItem(key, property, value) {
    var obj = this.getObject(key);
    obj[property] = value;
    console.log("obj===", obj)

    this.setObject(key, obj);
  }
  encrypt(data: any) {
    this.encryptInfo = CryptoJS.AES.encrypt(JSON.stringify(data), this.getToken()).toString();
    return this.encryptInfo
  }

  decrypt(data: any) {
    var deData = CryptoJS.AES.decrypt(data, this.getToken());
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    return this.decryptedInfo
  }

  getToken() {
    return this.login.getLoginDetails().token
  }
  public validate(data) {
    console.log(data)
    this.mismatch = true
    const expression = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    var string = expression.test(String(data).toLowerCase());
    if (data) {
      if (data == data.match(string)) {
        this.mismatch = false
      } else {
        this.mismatch = true
      }
    }
  }
  convertTime(a) {
    var timeArr = a.split(':')
    var date = ''
    if (timeArr[0] != '00') {
      date += timeArr[0] + ' hour '
    }
    if (timeArr[1] != '00') {
      date += timeArr[1] + ' minute '
    }
    if (timeArr[2] != '00') {
      date += timeArr[2] + ' second '
    }
    if (date == '' || date == '-') {
      date = '05 second'
    }
    return date
  }

  getTotTime(inTime, outTime) {
    // console.log("time===",inTime,outTime)
    this.date1 = new Date(inTime)
    this.date2 = outTime == null ? new Date() : new Date(outTime)
    // console.log("time2===",this.date1, this.date2)
    if (this.date1 != "Invalid Date") {
      if (this.date2 != "Invalid Date") {
        var diff = Math.abs(this.date2 - this.date1)
      }
      else {
        return '-'
      }

      let ms = diff % 1000;
      diff = (diff - ms) / 1000;
      let s = diff % 60;
      diff = (diff - s) / 60;
      let m = diff % 60;
      diff = (diff - m) / 60;
      let h = diff

      let ss = s <= 9 && s >= 0 ? "0" + s : s;
      let mm = m <= 9 && m >= 0 ? "0" + m : m;
      let hh = h <= 9 && h >= 0 ? "0" + h : h;

      var time = hh + ':' + mm + ':' + ss
      //  console.log("time======",time)
      return this.convertTime(time)
    }
  }
  getZone() {
    var date = new Date()
    var timezone = date.getTimezoneOffset()
    console.log("time zone==", timezone)

    // let m = timezone % 60;
    // console.log("m==",m)
    // timezone = (timezone - m) / 60;
    // let h = timezone
    // console.lo/g("h==",m)

    // let mm = m <= 9 && m >= 0 ? "0"+m : m;
    // let hh = h <= 9 && h >= 0 ? "0"+h : h;

    // var timezones=-(timezone)
    // console.log("time zone==",time1zone)

    // if(timezones<0 ){
    //   var timeZone= '-'+((hh)+':'+(mm)).toString()
    // }
    // else{
    //   timeZone= '+'+ ((-hh)+':'+ (-mm)).toString()
    // }

    return date.getTimezoneOffset()
  }
}

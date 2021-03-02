import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { LoginAuthService } from './login-auth.service';
import * as CryptoJS from 'crypto-js';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public encryptInfo;
  public decryptedInfo;
  public token;
  public mismatch: boolean
  private requests: any = {};
  public loadingFreez: BehaviorSubject<any> = new BehaviorSubject<any>([])
  public deviceChanges = new Subject<any>();
  constructor(
    private _snackBar: MatSnackBar,
    private login: LoginAuthService) {
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

  encrypt(data: any) {

    this.encryptInfo = CryptoJS.AES.encrypt(JSON.stringify(data), this.getToken()).toString();

    // console.log("encryptInfo===", this.encryptInfo);

    return this.encryptInfo
  }

  decrypt(data: any) {

    var deData = CryptoJS.AES.decrypt(data, this.getToken());

    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));

    // console.log("decryptedInfo====", this.decryptedInfo);

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
}

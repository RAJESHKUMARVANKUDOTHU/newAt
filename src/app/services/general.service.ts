import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs'
import { LoginAuthService } from './login-auth.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public encryptInfo;
  public decryptedInfo;
  public token;
  public loadingFreez: BehaviorSubject<any> = new BehaviorSubject<any>([])
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

  encrypt(data: any) {

    this.encryptInfo = CryptoJS.AES.encrypt(JSON.stringify(data), this.getToken()).toString();

    console.log("encryptInfo===", this.encryptInfo);

    return this.encryptInfo
  }

  decrypt(data: any) {

    var deData = CryptoJS.AES.decrypt(data, this.getToken());

    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));

    console.log("decryptedInfo====", this.decryptedInfo);

    return this.decryptedInfo
  }

  getToken() {
    return this.login.getLoginDetails().token
  }
}

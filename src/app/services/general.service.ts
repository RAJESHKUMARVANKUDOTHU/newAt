import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import{Observable, BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public loadingFreez : BehaviorSubject<any> = new BehaviorSubject<any>([])
  constructor(private _snackBar: MatSnackBar) {

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}

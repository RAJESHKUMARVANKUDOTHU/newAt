import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.css']
})
export class SettingInfoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  type:any
  loginData:any
  constructor(
    public dialogRef: MatDialogRef<SettingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private login:LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
  ) { 
    this.type=data.type
  }

  ngOnInit(): void {

  }

}

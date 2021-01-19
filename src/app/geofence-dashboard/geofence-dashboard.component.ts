import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { LoginAuthService } from '../services/login-auth.service';
@Component({
  selector: 'app-geofence-dashboard',
  templateUrl: './geofence-dashboard.component.html',
  styleUrls: ['./geofence-dashboard.component.css']
})
export class GeofenceDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  assetData:any=[]
  dataSource: any = [];
  displayedColumns = ['i','assetId','assetName','updatedOn','location','geofenceStatus'];
  constructor(
    private login:LoginAuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.refreshGeofence()
  }

  refreshGeofence(){
    this.dataSource = new MatTableDataSource(this.assetData);

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator=this.paginator
      
    })
  }

}

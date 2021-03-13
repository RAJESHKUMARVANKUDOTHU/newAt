import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
@Component({
  selector: 'app-zone-dashboard',
  templateUrl: './zone-dashboard.component.html',
  styleUrls: ['./zone-dashboard.component.css']
})
export class ZoneDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  zoneData: any = []
  dataSource: any = [];
  displayedColumns = ['i', 'deviceId', 'deviceName', 'zoneName', 'inTime', 'outTime', 'totalTime'];
  constructor(
    private general: GeneralService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.refreshZoneData()
  }
  refreshZoneData() {
    this.api.getZoneDashBoard().then((res: any) => {
      console.log("getZoneDashBoard res==", res)
      if (res.status) {
        this.zoneData = res.success
        for (let i = 0; i < res.success.length; i++) {
          res.success[i].totalTime = this.general.getTotTime(res.success[i].inTime, res.success[i].outTime)
        }
        this.dataSource = new MatTableDataSource(this.zoneData);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator

        })
      }
      else {

      }
    })
  }

  search(a) {
    this.dataSource = new MatTableDataSource(this.zoneData);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter =a.trim().toLowerCase()
    })
  }
}

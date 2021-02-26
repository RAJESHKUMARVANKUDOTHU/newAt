import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.css']
})
export class VehicleStatusComponent implements OnInit {
  zoneData: any = []
  constructor(
    private api: ApiService,
    private general: GeneralService,
  ) { }

  ngOnInit(): void {
    this.getZoneDetails()
  }
  getZoneDetails() {
    this.api.getZone().then((res: any) => {
      console.log('zone details response==', res);
      this.zoneData = [];
      if (res.status) {
        this.zoneData = res.success;
      }
      else { }

    })
  }
  getFillColor(value) {

    var a = {
      'background-color': 'green',
      width: 'fit-content'

    }
    return a
  }

}

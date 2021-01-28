import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public mapEdit = new Subject<any>();
  public mapZone = new Subject<any>();
  public mapError = new Subject<any>();
  public mapDetectChanges = new Subject<any>();
  public GatewayCoinBound : any = [];
  public selectedLayoutZone: any = {
    layout: '',
    zone: '',
    bounds: [],
  };
  public selectedCoinBound: any = {
    layout: '',
    gatewayId: '',
    coinId: 0,
    bounds: [],
  };
  constructor() {}

  clear() {
    // this.selectedLayoutZone.layout = '';
    this.selectedLayoutZone.zone = '';
    this.selectedLayoutZone.bounds = [];

    // this.selectedCoinBound.layout = '';
    this.selectedCoinBound.gatewayId = '';
    this.selectedCoinBound.coinId = 0;
    this.selectedCoinBound.bounds = [];
  }
}

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
  selectedLayoutZone: any = {
    layout: '',
    zone: '',
    bounds: [],
  };
  constructor() {}

  clear() {
    this.selectedLayoutZone.layout = '';
    this.selectedLayoutZone.zone = '';
    this.selectedLayoutZone.bounds = [];
  }
}

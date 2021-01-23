import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public mapEdit = new Subject<any>();
  public mapError = new Subject<any>();

  constructor() {
    this.mapError.subscribe((data:any)=>{
      console.log("err map==",data);
    })
   }
}

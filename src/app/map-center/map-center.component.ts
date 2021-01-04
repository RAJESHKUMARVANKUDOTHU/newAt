import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-map-center',
  templateUrl: './map-center.component.html',
  styleUrls: ['./map-center.component.css']
})
export class MapCenterComponent implements OnInit {
  createLocation:FormGroup
  gateway:any=[]
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private login:LoginAuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.createLocation=this.fb.group({
      locationName:['',Validators.required],
      description:[''],
      gatewayId:['',Validators.required]
    })
    this.refreshGateway()
  }
  refreshGateway(){
    this.api.getGatewayData().then((res:any)=>{
      console.log("gatway submit====",res);
      this.gateway=[]
      if(res.status){
        this.gateway=res.success
      }

    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
  search(event){
    
  }
  submit(data){

  }

}

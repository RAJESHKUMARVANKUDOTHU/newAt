import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent implements OnInit {
  addFind:FormGroup
  addGateway:FormGroup
  addCoin:FormGroup
  assignAsset:FormGroup
  deassignAsset:FormGroup
  gateway:any
  type:any
  constructor(
    public dialogRef: MatDialogRef<AddAssetsComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private fb: FormBuilder,
    private general:GeneralService,
    private login:LoginAuthService,
    private api: ApiService,
  ) {
    this.type=data.type
  }

  ngOnInit(): void {
    this.addFind=this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', [Validators.required,Validators.min(1)]],
    })
    this.addGateway=this.fb.group({
      gatewayName: ['', Validators.required],
      gatewayId: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(12)]],
    })
    this.addCoin=this.fb.group({
      coinName: ['', Validators.required],
      coinId: ['', [Validators.required,Validators.min(1)]],
      gatewayId:['', Validators.required]
    })

    this.refreshGateway()
  }

  findSubmit(data){
    try{
      if(this.addFind.valid){
        data.userId=1
        this.api.deviceRegistration(data).then((res:any)=>{
          console.log("find submit====",res);
          if(res.status){
            var msg = 'Device Registered Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Device Name or Device Id Already exists, try different device'
            this.general.openSnackBar(msg,'')
          }
        
        })
      }
    }
    catch(err){

    }

  }
  gatewaySubmit(data){
    try{
      if(this.addGateway.valid){
        data.userId=1
        this.api.gatewayRegistration(data).then((res:any)=>{
          console.log("find submit====",res);
          if(res.status){
            var msg = 'Gateway Registered Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Gateway Name Already exists, try different Name'
            this.general.openSnackBar(msg,'')
          }
        
        })
      }
    }
    catch(err){

    }
  }
  coinSubmit(data){
    try{
      if(this.addCoin.valid){
        this.api.coinRegistration(data).then((res:any)=>{
          console.log("find submit====",res);
          if(res.status){
            var msg = 'Coin Registered Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Coin Name or Coin Id Already exists, try different coin'
            this.general.openSnackBar(msg,'')
          }
        
        })
      }
    }
    catch(err){

    }
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

}

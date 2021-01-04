import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-edit-assets',
  templateUrl: './edit-assets.component.html',
  styleUrls: ['./edit-assets.component.css']
})
export class EditAssetsComponent implements OnInit {
  editFind:FormGroup
  editGateway:FormGroup
  editCoin:FormGroup
  gateway:any
  type:any
 patchData:any
  constructor(
    public dialogRef: MatDialogRef<EditAssetsComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private fb: FormBuilder,
    private login:LoginAuthService,
    private api: ApiService,
    private general:GeneralService,

  ) {
    this.type=data.type
    this.patchData=data.data
    console.log("patch data===",this.patchData)
   }

  ngOnInit(): void {
    this.editFind=this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: [{value: '', disabled: true}, Validators.required],
    })
    this.editGateway=this.fb.group({
      gatewayName: ['', Validators.required],
      gatewayId: [{value: '', disabled: true}, Validators.required],
    })
    this.editCoin=this.fb.group({
      coinName: ['', Validators.required],
      coinId: [{value: '', disabled: true}, Validators.required],
      gatewayId:['', Validators.required]
    })

    //function call
    this.patchValue()
    this.refreshGateway()

  }

  patchValue(){
    if(this.type=='find'){
      this.editFind.patchValue({
        deviceName:this.patchData.deviceName,
        deviceId:this.patchData.deviceId
      })

    }
    else if(this.type=='gateway'){
      this.editGateway.patchValue({
        gatewayName:this.patchData.gatewayName,
        gatewayId:this.patchData.gatewayId
      })
    }
    else{
      this.editCoin.patchValue({
        coinId:this.patchData.coinId,
        coinName:this.patchData.coinName,
        gatewayId:this.patchData.gatewayId
      })
    }
  }

  updateFind(data){
    try{
      if(this.editFind.valid){
        data.userId=1
        this.api.editDevice(data).then((res:any)=>{
          console.log("find submit====",res);
          if(res.status){
            var msg = 'Device Updated Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Device Name Already exists, try different Name'
            this.general.openSnackBar(msg,'')
          }
        
        })
      }
    }
    catch(err){

    }
  }

  updateGateway(data){
    try{
      if(this.editGateway.valid){
        data.userId=1
        this.api.editGateway(data).then((res:any)=>{
          console.log("gateway submit====",res);
          if(res.status){
            var msg = 'Gateway Updated Successfully'
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

  updateCoin(data){
    try{
      if(this.editCoin.valid){
        data.userId=1
        this.api.editCoin(data).then((res:any)=>{
          console.log("find submit====",res);
          if(res.status){
            var msg = 'Coin Updated Successfully'
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            var msg = 'Coin Name Already exists, try different Name'
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
      console.log("coin submit====",res);
      this.gateway=[]
      if(res.status){
        this.gateway=res.success
      }

    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
}

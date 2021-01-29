import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileData:any
  editProfile
  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private fb: FormBuilder,
  ) {
    this.profileData=data.data
   }

  ngOnInit(): void {
    this.editProfile=this.fb.group({
      userName:[this.profileData.userName,[Validators.email,Validators.required]]
    })
  }

  submit(data){
    console.log("edit profile data==",data)
    // this.api.name.then((res:any)=>{

    // }).catch((err:any)=>{
    //   console.log("error===",err)
    // })
  }
}

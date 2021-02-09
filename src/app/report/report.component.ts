import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service'
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  genericReport:FormGroup
  customReport:FormGroup

  constructor(
    private fb : FormBuilder,
    private login : LoginAuthService,
    private api : ApiService,
    private general : GeneralService
  ) { }

  ngOnInit(): void {

    this.genericReport=this.fb.group({
      type:['',Validators.required],
      days:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required]
    })
    this.customReport=this.fb.group({
      type:['',Validators.required],
      days:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required]
    })
    this.patchGenricDate()
    this.patchCustomDate()
  }

  patchGenricDate(){
    this.genericReport.get('days').valueChanges.subscribe((value) => {
      var date=new Date()
      date.setDate(date.getDate() - parseInt(value));
      this.genericReport.controls['fromDate'].patchValue((date));
    });
    this.genericReport.get('days').valueChanges.subscribe(() => {
      var date=new Date()
      date.setDate(date.getDate());
      this.genericReport.controls['toDate'].patchValue((date));
    });
  }

  patchCustomDate(){
    
    this.customReport.get('days').valueChanges.subscribe((value) => {
      var date=new Date()
      date.setDate(date.getDate() - parseInt(value));
      this.customReport.controls['fromDate'].patchValue((date));
    });
    this.customReport.get('days').valueChanges.subscribe(() => {
      var date=new Date()
      date.setDate(date.getDate());
      this.customReport.controls['toDate'].patchValue((date));
    });
  }
  
  onsubmitGenericReport(data){
    console.log("generic data==",data)
    data=this.general.encrypt(data)

  }
  onsubmitCustomReport(data){
    console.log("custom data==",data)
    data=this.general.encrypt(data)

  }

}

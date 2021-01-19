import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';
import { ApiService } from '../services/api.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India];
  contactForm:FormGroup
  constructor(
    private dialogRef: MatDialogRef<ContactComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private login:LoginAuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.contactForm=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      mobileNumber:['',Validators.required]
    })
  }
  
  onSubmit(data){
    console.log("data==",data)
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
// import { GeneralMaterialsService } from '../general-materials.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
   passwordType: string = 'password';
   passwordIcon: string = 'visibility_off';
   adminLoginform: FormGroup;
   public loginInvalid: boolean;
   constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private login: LoginAuthService,
      private api: ApiService,

    ) {
      localStorage.clear()

    }

 
  ngOnInit(): void {
    this.adminLoginform = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    localStorage.clear()
  }

 onSubmit(data) {

    this.loginInvalid = false;
    if (this.adminLoginform.valid){
      try {
        this.api.adminLogin(data).then((res:any)=>{
        	console.log("admin res===",res)
          if(res.token){
           	
            if(this.login.login(JSON.stringify(res))){
                this.router.navigate(['/admin-dashboard'])
            }
            else{}
          }
        })
      } catch (err) {
        this.loginInvalid = true;
      }
    }
    else{}
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  } 
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loginInvalid: boolean;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginAuthService,
    private general: GeneralService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.email, Validators.required]],
      password: ['']
    })

  }
  onSubmit(data) {
    console.log("data===", data)
    this.loginInvalid = false
    if (this.loginForm.valid) {
      try {
        console.log("data===", data)

        this.api.login(data).then((res: any) => {
          console.log("login res===", res)

          if (res.token) {
            if (this.login.login(JSON.stringify(res))) {
              // this.login.loginCheckData.next(true)
              console.log("i stepped")
              this.router.navigate(['/dashboard'])
            }
            else {
              this.loginInvalid = true
            }
          }
          else { }
        }).catch((err) => {
          console.log("err======", err)
        })
      }
      catch (err) {
        this.loginInvalid = true;
      }
    }
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
}

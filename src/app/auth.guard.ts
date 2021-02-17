import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from './services/login-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginData: any
  constructor(private login: LoginAuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginData = this.login.getLoginDetails()

    console.log("auth ", this.loginData, route.data.role)
   
    if (this.loginData && this.loginData.token) {
      // console.log("in",route.data.role[0].toString() == 'superAdminRole')
      let role = route.data.role.filter((obj)=>{
        return obj == this.loginData.success.role 
    })
      console.log("role ===",role)
        if(role.length){
          if (role[0] == "superAdminRole") {
            // console.log("in")
            this.login.loginCred.next(false)
            this.login.loginCheckData.next(true)
          }
          else if (role[0] == "adminRole" || role[0] == "userRole"
           || role[0] == 'coAminRole' || role[0]== 'subAdminRole') {
            if( role[0] == "userRole" || role[0]== 'subAdminRole'){
                if(state.url == '/setting' || state.url == '/profile'){
                    this.router.navigate(['/dashboard'])
                }
                else{
                  this.login.loginCred.next(true)
                  this.login.loginCheckData.next(true)
                }
            }
            else{
              this.login.loginCred.next(true)
              this.login.loginCheckData.next(true)
            }
          }
    
          return true;
        }
    }

    else {
      this.login.loginCred.next(false)
      this.login.loginCheckData.next(false)
      this.router.navigate(['/login'])
    }
  }

}

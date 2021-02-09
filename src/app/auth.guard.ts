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

    console.log("auth ", this.loginData, route.data.role[0])
    if (this.loginData && this.loginData.token && this.loginData.success.role == route.data.role[0]) {
      // console.log("in",route.data.role[0].toString() == 'superAdminRole')
      if (route.data.role[0] == "superAdminRole") {
        // console.log("in")
        this.login.loginCred.next(false)
        this.login.loginCheckData.next(true)
      }
      else if (route.data.role[0] == "adminRole") {
        // console.log("in")
        this.login.loginCred.next(true)
        this.login.loginCheckData.next(true)
      }

      return true;
    }

    else {
      this.login.loginCred.next(false)
      this.login.loginCheckData.next(false)
      this.router.navigate(['/login'])
    }
  }

}

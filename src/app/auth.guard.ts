import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from './services/login-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginData:any
  constructor( private login:LoginAuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.loginData = this.login.getLoginDetails()
    
      console.log("auth ",this.loginData)
      if( this.loginData && this.loginData.role == route.data.role){
        if(route.data.role == 'admin'){
           this.login.loginCred.next(false)
           this.login.loginCheckData.next(true )
        }
        else if(route.data.role == 'user'){
           this.login.loginCred.next(true)
           this.login.loginCheckData.next(true)
        }
        return true; 
      }
   
      else{
        this.login.loginCred.next(false)
        this.login.loginCheckData.next(false)
        this.router.navigate(['/login'])
      }
  }
  
}

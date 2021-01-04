import { Injectable } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { EMPTY } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
 status:any
  constructor(private login:LoginAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("tok==",this.login.getToken())
    this.status = this.login.getLoginDetails();
    console.log("this.status",this.status)
    // var route = window.location.pathname
    
    if(this.status){
      console.log("interceptor success",this.status.token)

      if (this.status.token) {
        console.log("interceptor success",this.status.token)
        request=request.clone({
          setHeaders: { Authorization: `Bearer ${this.status.token}`}
        })
        return next.handle(request);

      }
      else{
        return EMPTY
      }
    }
    else{
      return next.handle(request);

    }
 
  }
}

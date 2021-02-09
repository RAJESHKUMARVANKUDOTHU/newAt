import { Injectable } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { GeneralService } from './services/general.service';
import { EMPTY } from 'rxjs';
import { throwError, Observable, BehaviorSubject, of, pipe } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  status: any
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private login: LoginAuthService,
    private general: GeneralService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("tok==",this.login.getLoginDetails())
    request= this.addAuthenticationToken(request)
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log("erooorr=", error)
        if (error.status === 403 || error.status === 401) {
          window.location.href = "/login"
          return EMPTY
        }
        else {
          return throwError(error);
        }

      }), tap((res: any) => {
        if (res instanceof HttpResponse) {
          console.log("tap res==", res)
          if (res.body.hasOwnProperty('data')) {
            res.body = this.general.decrypt(res.body.data)
            return res
          }
          else {
            return res
          }
        }
        else{}
        
    })

    ) as any

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    this.status = this.login.getLoginDetails();
   
    if (this.status.token && this.status.token !=null) {
      request= request.clone({
        setHeaders: { Authorization: `Bearer ${this.status.token}`}
      })
      if ( request instanceof HttpRequest){
        console.log("http request==", request);
        let authHeaders = request.headers.get('authorization');
        if(authHeaders){
          let body = request.body
          if(body){
            request.body = {}
            request.body.data = this.general.encrypt(body)
          }
          else{
            request.body = request.body;
          }
        }
        else{
          return request
        }
      }bn 
      return request
    }
    else{
      return request;
    }
  }

}

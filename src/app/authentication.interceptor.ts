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
  constructor(
    private login: LoginAuthService,
    private general: GeneralService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("tok==",this.login.getLoginDetails())
    request = this.addAuthenticationToken(request)
    return next.handle(request).pipe(
      catchError((error: any) => {
        // console.log("erooorr=", error)
        if (error.status === 403 || error.status === 401) {
          localStorage.clear()
          
          return EMPTY
        }
        else if (error.status === 200) {
          // console.log("error 200===", error);

        }
        else {
          return throwError(error);
        }

      }), tap((res: any) => {
        if (res instanceof HttpResponse) {
          // console.log("tap res==", res)
          if (res.body.hasOwnProperty('data')) {
            res.body.data = this.general.decrypt(res.body.data)
            return res
          }
          else {
            return res
          }
        }
        else { }

      })

    ) as any

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    this.status = this.login.getLoginDetails();

    if (this.status.token && this.status.token != null) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.status.token}` }
      })
      if ( request instanceof HttpRequest){
        // console.log("http request==", request);
        let authHeaders = request.headers.get('authorization');
        if (authHeaders) {
          let body = request.body
          if(body){
            request.body = {}
            request.body.data = this.general.encrypt(body)
          }
        }
        else {
          return request
        }
      }
      return request
    }
    else {
      return request;
    }
  }

}

import { Injectable } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { EMPTY } from 'rxjs';
import { throwError, Observable, BehaviorSubject, of,pipe } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
 status:any
 private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private login:LoginAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("tok==",this.login.getLoginDetails())
    this.status = this.login.getLoginDetails();
    // console.log("this.status",this.status)
    // var route = window.location.pathname
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json')
    //   });
    // }

    request = this.addAuthenticationToken(request);
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            // console.log("erooorr=",error)
            if (error.status === 403 || error.status === 401) {
            //   console.log("handling")
                  this.login.logout()
            //   // 401 errors are most likely going to be because we have an expired token that we need to refresh.
            //   if (this.refreshTokenInProgress) {
            //     console.log("this.refreshTokenSubject==",this.refreshTokenSubject)
            //     // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            //     // which means the new token is ready and we can retry the request again
            //     return this.refreshTokenSubject.pipe(
            //       filter(result => result !== null),
            //       take(1),
            //       switchMap(() => next.handle(this.addAuthenticationToken(request)))
            //     );
                
            //   } else {
            //     this.refreshTokenInProgress = true;

            //     // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            //     this.refreshTokenSubject.next(null);
                
            //     return this.refreshAccessToken().pipe(
            //       switchMap((success: boolean) => {               
            //         this.refreshTokenSubject.next(success);
            //         return next.handle(this.addAuthenticationToken(request))
            //       }),
            //     );
            //   }   
          }
       
          else{
            return throwError(error);
          }
        })
      ) as any
  }

  private refreshAccessToken(): Observable<any> {
    this.status = this.login.getLoginDetails();
    return of(this.status.token);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    this.status = this.login.getLoginDetails();
    if (this.status.token && this.status.token !=null) {
      request= request.clone({
        setHeaders: { Authorization: `Bearer ${this.status.token}`}
      })
      
    }
    else{
      return request;
    }

    return request
  }
}

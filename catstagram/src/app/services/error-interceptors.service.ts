import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import{ ToastrService} from'ngx-toastr';
``


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorsService implements HttpInterceptor{

  constructor(private toastr: ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err)=>{
        let message =""
        if(err.status == 401){
          //refres token or navigate to login
          message = "Token has expired or you should be logged in"
        }
        else if(err.status == 404){
          //some custom message
          message ="404"
        }
        else if( err.status === 400){
          //some message
          message="400";
        }
        else{
          //global message for error!
          message = "Unexpected error"
        }
          this.toastr.error(message)
        return throwError(err)
      })
    )
  }
}

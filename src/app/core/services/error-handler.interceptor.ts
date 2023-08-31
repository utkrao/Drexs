import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService,) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
            // console.log("\n======= ErrorHandlerInterceptor ==========\n");
            // console.log("err : ", err);
            // console.log("\n======= ! ErrorHandlerInterceptor ==========\n");
            // const error = err.error.message || err.statusText;
            let errorMessage =  err?.error?.error || err?.error?.message ;
            errorMessage = errorMessage?.message ? errorMessage?.message : errorMessage          
            this.toastr.error(errorMessage ? errorMessage : `Internal Server Error`);
            return throwError(err);
        }))
    }
}
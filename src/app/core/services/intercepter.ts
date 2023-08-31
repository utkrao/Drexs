import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: string;
  constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ignoreTokenUrl = ['https://jsonip.com']
    // console.log("req.url: ", req.url);
    this.token = this.storageService.get('token');
    if (this.token && !ignoreTokenUrl.includes(req.url)) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
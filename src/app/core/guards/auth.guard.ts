import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.storage.get('logged');
    if (this.storage.get('logged')) {
      return true;
    } else {
      const keys = this.storage.get('keys');
      if(keys) {
        this.router.navigateByUrl('/auth/login');
      } else {
        this.router.navigateByUrl('/auth/landing');
      }
    }
  }
}

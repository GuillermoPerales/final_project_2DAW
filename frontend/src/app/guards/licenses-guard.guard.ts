import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class LicensesGuardGuard implements CanActivate {
  constructor(private usersService:UsersService,private alertService:AlertService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.usersService.getGuardPermissions('searchLicenses')
  }
  
}

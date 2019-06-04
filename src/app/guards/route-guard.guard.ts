import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate  {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentToken = window.localStorage.getItem('token');
    if (currentToken != null) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}

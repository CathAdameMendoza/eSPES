import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    // Add your authorization logic here
    const isAuthenticated = false;
    
    if (!isAuthenticated) {
      this.router.navigate(['/landing']);
      return false;
    }

    return true;
  }
}

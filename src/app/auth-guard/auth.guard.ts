import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getLoginStatus().then((response: any) => {
        if(response && response.status === "unknown") {
          console.log("authguard: " + response.status);
          this.router.navigate(['/login']);
          return false;
        } else if(response && response.status == "connected") {
          console.log("authguard: " + response.status);
          return true;
        } else {
          console.log("authguard: " + response.status);
          return false;
        }
      });
  }
  
}

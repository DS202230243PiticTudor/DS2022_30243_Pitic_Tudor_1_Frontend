import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserRole(route);
  }

  checkUserRole(route: ActivatedRouteSnapshot): boolean {
    let user = this.authenticationService.getUserFromLocalCache()
    if (user !== null) {
      if (user.role == "ROLE_SUPER_ADMIN") {
        return true;
      } else {
        this.router.navigate(['persons/' + user.id])
      }
    }
    return false;
  }

}

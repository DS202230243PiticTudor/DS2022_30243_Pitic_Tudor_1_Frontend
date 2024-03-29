import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {NotificationType} from "../models/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService:NotificationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return true;
  }

  private isUserLoggedIn(): boolean {
    if(this.authenticationService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR, "You need to login to access this page");
    return false;
  }
}

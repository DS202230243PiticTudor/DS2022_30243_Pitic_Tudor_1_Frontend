import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserLogin} from "../models/userLogin.model";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {Subscription} from "rxjs";
import {Person} from "../models/person.model";
import {NotificationType} from "../models/notification-type.enum";
import {HeaderType} from "../models/header-type.enum";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  user: UserLogin = {
    username:'',
    password:''
  };

  submitted = false;
  public showLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router :Router,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/persons');
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  login(): void {
    this.user = this.form.value
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(this.user).subscribe(
        (response: HttpResponse<Person>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          console.log(token);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('persons');
          this.showLoading = false;
        },
        (errorResponse : HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }

  register() {
    this.router.navigateByUrl("register");
  }
}

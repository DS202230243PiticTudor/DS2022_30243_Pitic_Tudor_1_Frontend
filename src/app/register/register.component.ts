import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {NotificationType} from "../models/notification-type.enum";
import {UserRegister} from "../models/userRegister.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  userRegister: UserRegister = {
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    role:'',
    email:''
  };

  roles: string[] = ["ROLE_USER", "ROLE_SUPER_ADMIN"];

  constructor(
    private authenticationService: AuthenticationService,
    private router :Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.form.value);
    this.userRegister = this.form.value;
    this.authenticationService.register(this.userRegister).subscribe(
      (response: string) => {
        console.log(response)
        this.sendNotification(NotificationType.SUCCESS, "User Created");
        this.router.navigateByUrl('login');
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error);
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  toLogin() {
    this.router.navigateByUrl('login');
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }
}

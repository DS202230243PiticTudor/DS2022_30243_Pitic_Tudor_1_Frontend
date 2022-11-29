import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  constructor(private router: Router, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }

  getAvatarInitials() {
    let firstName = this.authenticationService.getUserFromLocalCache()?.firstName;
    let lastName = this.authenticationService.getUserFromLocalCache()?.lastName;
    if(typeof firstName == "string" && typeof lastName == "string"){
      return firstName[0] + lastName[0];
    } else {
      return "NULL";
    }
  }
}

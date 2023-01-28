import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  avatarColor: string = '';
  username: string = '';
  constructor(private router: Router, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.avatarColor = this.authenticationService.getUserFromLocalCache()!.avatarColor;
    this.username = this.authenticationService.getUserFromLocalCache()!.username;
    if(this.avatarColor === undefined || this.avatarColor === '') {
      this.avatarColor = '#d1d5db';
      console.log('Avatar Color: ' + this.avatarColor);
    }
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

  invertHexColor(hex: string) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  private padZero(str: string) {
    let len = 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  angleOfGradient(username: string): number {
    let sum = 0;
    for(let i = 0; i < username.length; i++) {
      sum += username.charCodeAt(i);
    }
    return sum % 360;
  }
}

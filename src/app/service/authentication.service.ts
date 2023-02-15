import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLogin} from "../models/userLogin.model";
import {Person} from "../models/person.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import {UserRegister} from "../models/userRegister.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host = environment.apiUrl;
  private loginEndpoint = environment.apiEndpoints.login;
  private registerEndpoint = environment.apiEndpoints.register;
  private token: string | null | undefined;
  private loggedInUsername: string | null | undefined;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(loginDTO: UserLogin): Observable<HttpResponse<Person>> {
    return this.http.post<Person>(this.host + this.loginEndpoint, loginDTO, {observe: "response"});
  }

  public register(registerDTO: UserRegister): Observable<string> {
    return this.http.post<string>(this.host + this.registerEndpoint, registerDTO);
  }

  public logout(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    localStorage.removeItem('user_role');
  }

  public saveToken(token: string | null) {
    this.token = token;
    if (typeof this.token === "string") {
      localStorage.setItem('token', this.token);
    }
  }

  public addUserToLocalCache(person: Person | null) {
    localStorage.setItem('user', JSON.stringify(person));
    localStorage.setItem('user_role', JSON.stringify(person?.role));
  }

  public getUserFromLocalCache(): Person | null {
    let tempPerson = localStorage.getItem('user');
    if (tempPerson !== null) {
      return JSON.parse(tempPerson);
    }
    return null;
  }

  public getUserRoleFromLocalCache(): string | null {
    return localStorage.getItem('user_role');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string | null | undefined{
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }
    this.logout();
    return false;
  }


}

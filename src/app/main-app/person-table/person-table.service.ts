import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserCreate} from "../../models/userCreate.model";
import {UserUpdate} from "../../models/userUpdate.model";

export interface PersonDetail {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  active: boolean;
  notLocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PersonTableService {

  url = environment.apiUrl;
  persons = environment.apiEndpoints.persons;
  personsCreate = environment.apiEndpoints.personsCreate;
  personsUpdate = environment.apiEndpoints.personsUpdate;
  constructor(private http: HttpClient) { }

  createPerson(person: UserCreate): Observable<UserCreate> {
    return this.http.post<UserCreate>(this.url + this.personsCreate, person);
  }

  getPersons(): Observable<PersonDetail[]>{
    return this.http.get<PersonDetail[]>(this.url + this.persons);
  }

  deletePerson(id: string): Observable<null> {
    return this.http.delete<null>(this.url + this.persons + id);
  }

  updatePerson(person: UserUpdate): Observable<PersonDetail> {
    return this.http.post<PersonDetail>(this.url + this.personsUpdate, person);
  }

}

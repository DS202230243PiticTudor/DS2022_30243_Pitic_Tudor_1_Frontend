import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PersonDetail} from "../person-table/person-table.service";

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {

  url = environment.apiUrl;
  persons = environment.apiEndpoints.persons;

  constructor(private http: HttpClient) { }

  getPerson(id: string): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(this.url + this.persons + id);
  }
}

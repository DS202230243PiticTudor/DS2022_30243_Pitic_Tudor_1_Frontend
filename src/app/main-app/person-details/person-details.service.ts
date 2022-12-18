import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PersonDetail} from "../person-table/person-table.service";
import {MeasurementDTO} from "../../models/measurementDTO.model";

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {

  url = environment.apiUrl;
  persons = environment.apiEndpoints.persons;
  measurement = environment.apiEndpoints.measurement;

  constructor(private http: HttpClient) { }

  getPerson(id: string): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(this.url + this.persons + id);
  }

  makeMeasurements(personId: string) {
    return this.http.post(this.url + this.measurement + personId, null);
  }

  getMeasurements(personId: string) {
    return this.http.get<MeasurementDTO[]>(this.url + this.measurement + personId);
  }
}

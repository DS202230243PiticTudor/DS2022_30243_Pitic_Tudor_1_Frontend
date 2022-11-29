import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeviceCreate} from "../../../models/deviceCreate.model";
import {DeviceUpdate} from "../../../models/deviceUpdate.model";

export interface DeviceDetail {
  id: string;
  description: string;
  address: string;
  maxEnergyConsumption: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceTableService {
  url = environment.apiUrl;
  devices = environment.apiEndpoints.devices;
  devicesCreate = environment.apiEndpoints.devicesCreate;
  devicesUpdate = environment.apiEndpoints.devicesUpdate;
  devicesPerson = environment.apiEndpoints.devicesPerson;

  constructor(private http: HttpClient) { }

  getDevice(id: string): Observable<DeviceDetail> {
    return this.http.get<DeviceDetail>(this.url + this.devices + id);
  }

  getDevices(personId: string): Observable<DeviceDetail[]> {
    return this.http.get<DeviceDetail[]>(this.url + this.devicesPerson + personId);
  }

  createDevice(device: DeviceCreate) {
    return this.http.post<DeviceDetail>(this.url + this.devicesCreate, device);
  }

  updateDevice(device: DeviceUpdate) {
    return this.http.post<DeviceDetail>(this.url + this.devicesUpdate, device);
  }

  deleteDevice(deviceId: string) {
    return this.http.delete<null>(this.url + this.devices + deviceId);
  }
}

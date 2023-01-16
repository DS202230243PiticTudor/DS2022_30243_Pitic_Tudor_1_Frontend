import { Injectable } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NotificationType} from "../models/notification-type.enum";
import {NotificationConsumption} from "../models/notification-consumption.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private notifier: NotifierService) { }

  public notify(type: NotificationType, message :string) {
    this.notifier.notify(type, message);
  }

  public notifyExceedingConsumption(type: NotificationType, notification: NotificationConsumption) {
    let message: string;
    message = "Device with id: " + notification.deviceId + "\nExceeded with " + notification.differenceInReading +
      "\nOn date " + notification.readingDate;
    this.notifier.notify(type, message);
  }
}

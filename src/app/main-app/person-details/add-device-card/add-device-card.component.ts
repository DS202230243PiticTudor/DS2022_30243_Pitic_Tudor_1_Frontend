import {Component, Inject, OnInit} from '@angular/core';
import {DeviceDetail, DeviceTableService} from "../device-table/device-table.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {NotificationType} from "../../../models/notification-type.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceCreate} from "../../../models/deviceCreate.model";
import {PersonDetail} from "../../person-table/person-table.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-device-card',
  templateUrl: './add-device-card.component.html',
  styleUrls: ['./add-device-card.component.scss']
})
export class AddDeviceCardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    maxEnergyConsumption: new FormControl('',[Validators.required]),
  });

  deviceCreate: DeviceCreate = {
    address: '',
    description: '',
    maxEnergyConsumption: 0,
    personId: ''
  }
  private personId: string = '';

  constructor(
    private deviceTableService: DeviceTableService,
    private dialogRef: MatDialogRef<AddDeviceCardComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) personDetail: PersonDetail
  ) {
    this.personId = personDetail.id;
  }

  ngOnInit(): void {
  }

  createDevice() {
    this.deviceCreate = this.form.value;
    this.deviceCreate.personId = this.personId;
    this.deviceTableService.createDevice(this.deviceCreate).subscribe(
      (response: DeviceDetail) => {
        console.log(response);
        this.sendNotification(NotificationType.SUCCESS, "Device Created");
        this.dialogRef.close(true);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error);
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }
}

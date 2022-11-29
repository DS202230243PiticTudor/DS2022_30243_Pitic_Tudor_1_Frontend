import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserUpdate} from "../../../models/userUpdate.model";
import {PersonDetail, PersonTableService} from "../../person-table/person-table.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {NotificationType} from "../../../models/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {DeviceCreate} from "../../../models/deviceCreate.model";
import {DeviceUpdate} from "../../../models/deviceUpdate.model";
import {DeviceDetail, DeviceTableService} from "../device-table/device-table.service";

@Component({
  selector: 'app-update-device-card',
  templateUrl: './update-device-card.component.html',
  styleUrls: ['./update-device-card.component.scss']
})
export class UpdateDeviceCardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    maxEnergyConsumption: new FormControl(0,[Validators.required]),
    personId: new FormControl('', [Validators.required]),
  });


  deviceUpdate: DeviceUpdate = {
    id: '',
    address: '',
    description: '',
    maxEnergyConsumption: 0,
    personId: ''
  }

  constructor(
    private deviceTableService: DeviceTableService,
    private dialogRef: MatDialogRef<UpdateDeviceCardComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) data: DeviceUpdate,
  ) {
    this.deviceUpdate = data;
    this.form.patchValue(this.deviceUpdate);
    console.log(this.form);
  }

  ngOnInit(): void {
  }

  updateDevice() {
    this.deviceUpdate = this.form.value;
    this.deviceTableService.updateDevice(this.deviceUpdate).subscribe(
      (response: DeviceDetail) => {
        this.sendNotification(NotificationType.SUCCESS, "Device Updated");
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

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeviceTableService} from "../device-table.service";
import {NotificationType} from "../../../../models/notification-type.enum";
import {NotificationService} from "../../../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss']
})
export class DeleteDeviceComponent implements OnInit {
  id: string = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private deviceTableService: DeviceTableService,
    private notificationService: NotificationService,
  ) {
    if (data.id) {
      this.id = data.id;
    }
  }

  ngOnInit(): void {
  }


  deletePerson(){
    this.deviceTableService.deleteDevice(this.id).subscribe(
      () => {
      this.dialogRef.close(true);
      this.sendNotification(NotificationType.INFO, "Device deleted successfully");
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error);
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      });
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonTableService} from "../person-table.service";
import {NotificationType} from "../../../models/notification-type.enum";
import {NotificationService} from "../../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss']
})
export class DeletePersonComponent implements OnInit {

  id: string = '';

  constructor(
    private dialogRef: MatDialogRef<DeletePersonComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private personTableService: PersonTableService,
    private notificationService: NotificationService,
  ) {
    if (data.id) {
      this.id = data.id;
    }
  }

  ngOnInit(): void {
  }

  deletePerson(){
    this.personTableService.deletePerson(this.id).subscribe(
      () => {
        this.dialogRef.close(true);
        this.sendNotification(NotificationType.INFO, "User deleted successfully");
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

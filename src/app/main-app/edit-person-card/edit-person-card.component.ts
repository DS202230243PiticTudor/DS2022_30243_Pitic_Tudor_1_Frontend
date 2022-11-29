import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonDetail, PersonTableService} from "../person-table/person-table.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {UserUpdate} from "../../models/userUpdate.model";
import {NotificationType} from "../../models/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-person-card',
  templateUrl: './edit-person-card.component.html',
  styleUrls: ['./edit-person-card.component.scss']
})
export class EditPersonCardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('',[Validators.required]),
    newUsername: new FormControl(''),
    role: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    newEmail: new FormControl('', [Validators.email]),
    active: new FormControl(true,[Validators.required]),
    notLocked: new FormControl(true,[Validators.required]),
  });

  userUpdate: UserUpdate = {
    id:'',
    firstName:'',
    lastName:'',
    username:'',
    newUsername:'',
    role:'',
    email:'',
    newEmail:'',
    active: false,
    notLocked: false
  }

  roles: string[] = ["ROLE_USER", "ROLE_SUPER_ADMIN"];

  constructor(
    private personTableService: PersonTableService,
    private dialogRef: MatDialogRef<EditPersonCardComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.userUpdate = data.element;
    this.userUpdate.newUsername = data.element.username;
    this.userUpdate.newEmail = data.element.email;
    this.form.patchValue(this.userUpdate);
    console.log(this.form);
  }

  ngOnInit(): void {
  }

  updateUser() {
    console.log(this.form.value);
    this.userUpdate = this.form.value;
    console.log(this.userUpdate)
    this.personTableService.updatePerson(this.userUpdate).subscribe(
      (response: PersonDetail) => {
        this.sendNotification(NotificationType.SUCCESS, "User Updated");
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

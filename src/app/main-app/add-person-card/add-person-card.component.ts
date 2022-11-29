import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCreate} from "../../models/userCreate.model";
import {NotificationType} from "../../models/notification-type.enum";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PersonDetail, PersonTableService} from "../person-table/person-table.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserUpdate} from "../../models/userUpdate.model";

@Component({
  selector: 'app-person-details-card',
  templateUrl: './add-person-card.component.html',
  styleUrls: ['./add-person-card.component.scss']
})
export class AddPersonCardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    active: new FormControl(true,[Validators.required]),
    notLocked: new FormControl(true,[Validators.required]),
  });

  userCreate: UserCreate = {
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    role:'',
    email:'',
    active: false,
    notLocked: false
  };

  roles: string[] = ["ROLE_USER", "ROLE_SUPER_ADMIN"];

  constructor(
    private personTableService: PersonTableService,
    private dialogRef: MatDialogRef<AddPersonCardComponent>,
    private notificationService: NotificationService,
  ) { }


  ngOnInit(): void {
  }

  createUser() {
    console.log(this.form.value);
    this.userCreate = this.form.value;
    this.personTableService.createPerson(this.userCreate).subscribe(
      (response: UserCreate) => {
        console.log(response);
        this.sendNotification(NotificationType.SUCCESS, "User Created");
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

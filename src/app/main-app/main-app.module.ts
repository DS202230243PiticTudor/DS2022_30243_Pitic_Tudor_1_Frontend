import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { PersonTableComponent } from './person-table/person-table.component';
import { DeletePersonComponent } from './person-table/delete-person/delete-person.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {authInterceptorProvider} from "../interceptor/auth.interceptor-provider";
import {AuthenticationService} from "../service/authentication.service";
import {AuthenticationGuard} from "../guard/authentication.guard";
import {NotificationModule} from "../notification/notification.module";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import { AddPersonCardComponent } from './add-person-card/add-person-card.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { EditPersonCardComponent } from './edit-person-card/edit-person-card.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {PersonDetailsModule} from "./person-details/person-details.module";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    PersonTableComponent,
    DeletePersonComponent,
    AddPersonCardComponent,
    EditPersonCardComponent,
    PersonDetailsComponent
  ],
    imports: [
        CommonModule,
        MainAppRoutingModule,
        MatDialogModule,
        MatButtonModule,
        NotificationModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatToolbarModule,
        PersonDetailsModule,
        MatCardModule
    ],
  providers: [
    authInterceptorProvider,
    AuthenticationService,
    AuthenticationGuard,
    MainAppRoutingModule
  ]
})
export class MainAppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainAppComponent } from './main-app/main-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MainAppModule} from "./main-app/main-app.module";
import { SignInComponent } from './sign-in/sign-in.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { ToastComponent } from './toast/toast.component';
import {MatIconModule} from "@angular/material/icon";
import {AuthenticationService} from "./service/authentication.service";
import {authInterceptorProvider} from "./interceptor/auth.interceptor-provider";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {NotificationModule} from "./notification/notification.module";
import { RegisterComponent } from './register/register.component';
import {MatSelectModule} from "@angular/material/select";
import {AvatarModule} from "ngx-avatar";

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    SignInComponent,
    ToastComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MainAppModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NotificationModule,
    MatSelectModule,
    AvatarModule
  ],
  providers: [
    authInterceptorProvider,
    AuthenticationService,
    AuthenticationGuard,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

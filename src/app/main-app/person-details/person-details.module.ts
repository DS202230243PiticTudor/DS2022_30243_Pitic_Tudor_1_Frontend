import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceTableComponent } from './device-table/device-table.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DeleteDeviceComponent } from './device-table/delete-device/delete-device.component';
import { AddDeviceCardComponent } from './add-device-card/add-device-card.component';
import { UpdateDeviceCardComponent } from './update-device-card/update-device-card.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    DeviceTableComponent,
    StatisticsComponent,
    DeleteDeviceComponent,
    AddDeviceCardComponent,
    UpdateDeviceCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ]
})
export class PersonDetailsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainAppComponent} from "./main-app.component";
import {PersonTableComponent} from "./person-table/person-table.component";
import {PersonDetailsComponent} from "./person-details/person-details.component";
import {DeviceTableComponent} from "./person-details/device-table/device-table.component";
import {StatisticsComponent} from "./person-details/statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'persons', component: PersonTableComponent,
      },
      {
        path: 'persons/:id', component: PersonDetailsComponent, children: [
          {
            path: '',
            redirectTo: 'device-table',
            pathMatch: 'full'
          },
          {
            path: 'device-table', component: DeviceTableComponent,
          },
          {
            path: 'statistics', component: StatisticsComponent,
          }]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }

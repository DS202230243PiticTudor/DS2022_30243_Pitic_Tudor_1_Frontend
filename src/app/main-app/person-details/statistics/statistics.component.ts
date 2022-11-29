import { Component, OnInit } from '@angular/core';
import {PersonDetail} from "../../person-table/person-table.service";
import {DeviceDetail, DeviceTableService} from "../device-table/device-table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonDetailsService} from "../person-details.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  person?: PersonDetail;
  dataSource: DeviceDetail[] = [];
  currentCalculation: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceTableService: DeviceTableService,
    private personDetailsService: PersonDetailsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(
      mapParams => {
        let personId: string;
        personId = mapParams.get('id') as string;
        this.personDetailsService.getPerson(personId).subscribe(
          data => {
            this.person = data;
            this.getAllDevices(this.person.id);
          });
      });
  }

  getAllDevices(personId: string) {
    this.deviceTableService.getDevices(personId).subscribe(
      res => {
        this.dataSource = res;
      });
  }

  calculateConsumption() {
    let sum = 0
    for (let device of this.dataSource) {
      sum += this.getRandomFloat(device.maxEnergyConsumption)
    }
    this.currentCalculation = sum;
  }

  getRandomFloat(max: number): number {
    return Math.random() * max;
  }
}

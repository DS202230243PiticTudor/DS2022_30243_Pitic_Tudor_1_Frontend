import { Component, OnInit } from '@angular/core';
import {PersonDetail} from "../../person-table/person-table.service";
import {DeviceDetail, DeviceTableService} from "../device-table/device-table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonDetailsService} from "../person-details.service";
import {MeasurementDTO} from "../../../models/measurementDTO.model";
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  person?: PersonDetail;
  dataSource: DeviceDetail[] = [];
  measurements: MeasurementDTO[] = [];
  dates: any[] = [];
  totalReadings: number[] = [];
  measurementsChart: any;

  option: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceTableService: DeviceTableService,
    private personDetailsService: PersonDetailsService,
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(
      mapParams => {
        let personId: string;
        personId = mapParams.get('id') as string;
        this.personDetailsService.getPerson(personId).subscribe(
          data => {
            this.person = data;
            this.getAllDevices(this.person.id);
            this.getMeasurements(this.person.id);
          });
      });
    this.option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "8%",
        top: "3%",
        containLabel: true
      },
      yAxis: {
        type: "value"
      },
      xAxis: {
        type: "category",
        data: this.dates,
        boundaryGap: false,
        axisLabel: {
          interval: 0,
          rotate: 15
        }
      },
      series: [
        {
          name: "total consumption",
          type: "line",
          data: this.totalReadings,
          areaStyle:{}
        }
      ]
    };
    // if(this.measurements.length !== 0) {
    //   // @ts-ignore
    //   this.measurementsChart = echarts.init(document.getElementById('chart'))
    //   this.measurementsChart.setOption(this.option);
    // }
  }

  makeMeasurement() {
    this.personDetailsService.makeMeasurements(this.person!.id).subscribe((res) => {
      console.log(res);
      console.log(this.totalReadings);
      this.getMeasurements(this.person!.id);
    });
  }

  getMeasurements(personId: string) {
    this.personDetailsService.getMeasurements(personId).subscribe(
      (res: MeasurementDTO[]) => {
        for (let m of res) {
          this.measurements.push(m);
          this.dates.push(
            new Date(m.createdDate).toLocaleDateString(
              undefined, {day: 'numeric', month: 'numeric', year: 'numeric'}
            )
          );
          this.totalReadings.push(m.totalMeasurement);
        }
        this.option.series[0].data = this.totalReadings;
        console.log(this.totalReadings);
      });
  }

  getAllDevices(personId: string) {
    this.deviceTableService.getDevices(personId).subscribe(
      res => {
        this.dataSource = res;
      });
  }
}

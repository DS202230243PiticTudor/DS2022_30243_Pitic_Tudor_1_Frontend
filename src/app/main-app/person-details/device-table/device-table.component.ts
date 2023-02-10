import {Component, OnInit} from '@angular/core';
import {DeviceDetail, DeviceTableService} from "./device-table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteDeviceComponent} from "./delete-device/delete-device.component";
import {AddDeviceCardComponent} from "../add-device-card/add-device-card.component";
import {UpdateDeviceCardComponent} from "../update-device-card/update-device-card.component";
import {PersonDetailsService} from "../person-details.service";
import {PersonDetail} from "../../person-table/person-table.service";
import {DeviceUpdate} from "../../../models/deviceUpdate.model";

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit {
  person?: PersonDetail;
  dataSource: DeviceDetail[] = [];
  displayedColumns: string[] = ['edit', 'address', 'description', 'maxEnergyConsumption', 'delete'];
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

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  deleteDevice(event: any, id: string) {
    event.stopPropagation();
    this.openDeleteDeviceDialog(id);
  }

  openDeleteDeviceDialog(id: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {id};
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(DeleteDeviceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.getAllDevices(this.person!.id);
        }
      });
  }

  openAddDeviceDialog($event: MouseEvent) {
    this.stopPropagation($event);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.person;
    dialogConfig.width = '550px';
    dialogConfig.height = '90%';
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(AddDeviceCardComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.getAllDevices(this.person!.id);
        }
      }
    );
  }

  openEditDeviceDialog($event: MouseEvent, element?: DeviceDetail) {
    this.stopPropagation($event);
    const dialogConfig = new MatDialogConfig();
    let deviceUpdate: DeviceUpdate;
    deviceUpdate = element as DeviceUpdate
    deviceUpdate.personId = this.person!.id;
    dialogConfig.data = deviceUpdate
    dialogConfig.width = '550px';
    dialogConfig.height = '90%';
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(UpdateDeviceCardComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.getAllDevices(this.person!.id);
        }
      }
    );
  }

  public clickOnDeviceRow(id: string) {
    console.log('Clicked on device: ' + id);
  }
}

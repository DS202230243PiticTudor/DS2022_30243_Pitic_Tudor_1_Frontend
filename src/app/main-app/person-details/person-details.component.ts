import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {PersonDetailsService} from "./person-details.service";
import {PersonDetail} from "../person-table/person-table.service";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  btnDevicesStyle: string = 'toolbar-buttons-default';
  btnStatsStyle: string = 'toolbar-buttons-default';

  person?: PersonDetail;
  personFound?: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private personDetailsService: PersonDetailsService,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    let urlElements = this.router.url.split('/');
    if (urlElements[urlElements.length - 1] === "device-table") {
      this.btnDevicesStyle = 'toolbar-buttons-selected';
    } else {
      this.btnStatsStyle = 'toolbar-buttons-selected';
    }

    this.personDetailsService.getPerson(id).subscribe(
      res => this.handleSuccess(res),
      error => this.handleError()
    );
  }


  handleSuccess(person: any) {
    this.person = person;
    this.personFound = true;
  }

  handleError() {
    this.router.navigate(['../page-not-found']);
  }

  clickBack() {
    this.router.navigateByUrl('persons');
  }

  onClickDevicesButton() {
    this.btnDevicesStyle = "toolbar-buttons-selected";
    this.btnStatsStyle = "toolbar-buttons-default";
    this.router.navigate(['device-table'], {relativeTo: this.route});
  }

  onClickStatsButton() {
    this.btnDevicesStyle = "toolbar-buttons-default";
    this.btnStatsStyle = "toolbar-buttons-selected";
    this.router.navigate(['statistics'], {relativeTo: this.route});
  }
}

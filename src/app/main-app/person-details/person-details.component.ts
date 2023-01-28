import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {PersonDetailsService} from "./person-details.service";
import {PersonDetail} from "../person-table/person-table.service";
import {AuthenticationService} from "../../service/authentication.service";
import {WebSocketService} from "../../service/web-socket.service";
import {Message} from "../../models/message.model";
import {NotificationConsumption} from "../../models/notification-consumption.model";
import {NotificationType} from "../../models/notification-type.enum";
import {Frame} from "stompjs";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  btnDevicesStyle: string = 'toolbar-buttons-default';
  btnStatsStyle: string = 'toolbar-buttons-default';
  btnChatStyle: string = 'toolbar-buttons-default';
  person?: PersonDetail;
  personFound?: boolean;
  showBackButton: boolean = false;
  stompClient: any;
  personId;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private personDetailsService: PersonDetailsService,
    private authenticationService: AuthenticationService,
    private webSocketService: WebSocketService,
  ) {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  ngOnInit(): void {
    this.personId = this.route.snapshot.params['id'];
    let urlElements = this.router.url.split('/');
    if (urlElements[urlElements.length - 1] === "device-table") {
      this.btnDevicesStyle = 'toolbar-buttons-selected';
    } else {
      this.btnStatsStyle = 'toolbar-buttons-selected';
    }

    this.personDetailsService.getPerson(this.personId).subscribe(
      res => this.handleSuccess(res),
      error => this.handleError()
    );
    let userRole = <string>this.authenticationService.getUserRoleFromLocalCache();
    let comparedRole = '\"ROLE_SUPER_ADMIN\"';
    this.showBackButton = userRole == comparedRole;

    if(this.checkIfOnPersonOwnPage()) {
      this.stompClient = this.webSocketService.getStomp();
      this.stompClient.connect({}, () => {
        let message: Message = {messageContent: this.personId}
        this.stompClient.subscribe('/user/' + this.personId + '/private', (messageReceive: Frame)=> {
          let notification: NotificationConsumption;
          let notifications: NotificationConsumption[] = JSON.parse(messageReceive.body);
          for(notification of notifications) {
            console.log(notification);
            this.notificationService.notifyExceedingConsumption(NotificationType.WARNING, notification);
          }
        });
        this.stompClient.send('/ws/private-message-notification', {}, JSON.stringify(message));
      });
    }
  }

  ngOnDestroy() {
    if(this.checkIfOnPersonOwnPage()){
      this.stompClient.disconnect();
    }
  }

  checkIfOnPersonOwnPage(): boolean {
    return this.personId === this.user.id;
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
    this.btnChatStyle = "toolbar-buttons-default";
    this.btnDevicesStyle = "toolbar-buttons-selected";
    this.btnStatsStyle = "toolbar-buttons-default";
    this.router.navigate(['device-table'], {relativeTo: this.route});
  }

  onClickStatsButton() {
    this.btnChatStyle = "toolbar-buttons-default";
    this.btnDevicesStyle = "toolbar-buttons-default";
    this.btnStatsStyle = "toolbar-buttons-selected";
    this.router.navigate(['statistics'], {relativeTo: this.route});
  }

  onClickChatButton() {
    this.btnChatStyle = "toolbar-buttons-selected";
    this.btnDevicesStyle = "toolbar-buttons-default";
    this.btnStatsStyle = "toolbar-buttons-default";
    this.router.navigate(['chat'], {relativeTo: this.route});
  }
}

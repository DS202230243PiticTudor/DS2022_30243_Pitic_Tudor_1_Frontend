import {Component, OnInit} from '@angular/core';
import {PersonDetail, PersonTableService} from "../../person-table/person-table.service";
import {Person} from "../../../models/person.model";
import {Router} from "@angular/router";
import {ChatService} from "./chat.service";
import {ChatMessageDTO} from "../../../models/chatMessageDTO.model";
import {WebSocketService} from "../../../service/web-socket.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {Frame} from "stompjs";
import {FormControl, FormGroup} from "@angular/forms";
import {ChatMessageSendDTO} from "../../../models/chatMessageSendDTO.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  dataSource: PersonDetail[] = [];
  selectedPerson: PersonDetail | null = null;
  selectedIndividualChatId: string = '';
  personId: string = '';
  messages: ChatMessageDTO[] = [];
  stompClient: any;
  user: Person;
  previousSub: any;

  form: FormGroup = new FormGroup({
    content: new FormControl('')
  });
  constructor(
    private router: Router,
    private personTableService: PersonTableService,
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private webSocketService: WebSocketService,
  ) {
    this.user = <Person>this.authenticationService.getUserFromLocalCache();
    this.personId = this.user.id;
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getIndividualChatsIds(this.personId);
    this.stompClient = this.webSocketService.getStomp();
    this.stompClient.connect({}, () => {
      let url = this.stompClient.ws._transport.url;
      url = url.replace("ws://localhost:8080/api/our-websocket/", "");
      url = url.replace("/websocket", "");
      url = url.replace(/^[0-9]+\//, "");
      console.log("Your current session is: " + url);
    });
  }

  getIndividualChatsIds(personId: string) {
    this.chatService.getIndividualChatsIds(personId).subscribe(ids => {
      console.log(ids);
    });
  }
  getAllPersons() {
    this.personTableService.getPersonsExceptWithId(this.personId).subscribe(persons => {
      this.dataSource = persons;
    });
  }

  getAvatarInitials(person: Person) {
    let firstName = person.firstName;
    let lastName = person.lastName;
    return firstName[0] + lastName[0];
  }

  invertHexColor(hex: string) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  private padZero(str: string) {
    let len = 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  angleOfGradient(username: string): number {
    let sum = 0;
    for (let i = 0; i < username.length; i++) {
      sum += username.charCodeAt(i);
    }
    return sum % 360;
  }

  onProfileCLick(person: PersonDetail): void {
    if(this.previousSub !== undefined) {
      this.previousSub.unsubscribe();
    }
    this.selectedPerson = person;
    this.chatService.connectToUser(this.personId, person.id).subscribe(messages => {
      this.messages = messages;
      this.selectedIndividualChatId = this.messages[0].individualChatId;
      // call endpoint, mark messages as seen
      if(this.messages.length === 0) {
        console.log("No messages");
      }
    });
    this.previousSub = this.stompClient.subscribe('/user/' + this.personId + '/chat', (messageReceive: Frame) => {
      let messages: ChatMessageDTO[] = JSON.parse(messageReceive.body);
      let message = messages[0];
      if(this.checkIfMessageIsFromSelectedPerson(message)) {
        this.messages.push(message);
        console.log(messages);
      } else {
        console.log("received a message in chat with id: " + message.individualChatId);
      }
    });

    // subscribe to seen stomp
    console.log(this.stompClient.subscriptions);
  }

  checkIfOwnMessage(message: ChatMessageDTO): boolean {
    return message.recipientId !== this.personId;
  }

  checkIfLastMessage(message: ChatMessageDTO): boolean {
    return message === this.messages[this.messages.length - 1];
  }

  checkIfMessageIsFromSelectedPerson(message: ChatMessageDTO): boolean {
    return message.individualChatId === this.selectedIndividualChatId;
  }

  sendMessage() {
    const message = this.form.value.content;
    if(message.trim().length !== 0) {
      let chatMessageSendDTO: ChatMessageSendDTO = {
        senderId : this.personId,
        peerId: this.selectedPerson!.id,
        content: message
      }
      console.log(chatMessageSendDTO);
      this.stompClient.send('/ws/send-message', {}, JSON.stringify(chatMessageSendDTO));
    } else {
      console.log("empty message");
    }
    this.form.reset();
  }
}

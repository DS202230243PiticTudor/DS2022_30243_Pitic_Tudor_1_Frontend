import { Component, OnInit } from '@angular/core';
import {PersonDetail, PersonTableService} from "../../person-table/person-table.service";
import {Person} from "../../../models/person.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  dataSource: PersonDetail[] = [];
  selectedPerson: PersonDetail | null = null;
  //   {
  //   id: 'random',
  //   firstName: 'Test',
  //   lastName: 'Name',
  //   username: 'test',
  //   email: 'string',
  //   avatarColor: '#cb1414',
  //   role: 'string',
  //   active: true,
  //   notLocked: true
  // }
  constructor(
    private personTableService: PersonTableService
  ) { }

  ngOnInit(): void {
    this.getAllPersons()
  }

  getAllPersons() {
    this.personTableService.getPersons().subscribe(persons => {
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
    for(let i = 0; i < username.length; i++) {
      sum += username.charCodeAt(i);
    }
    return sum % 360;
  }

  onProfileCLick(person: PersonDetail): void {
    this.selectedPerson = person;
    console.log("Clicked on: @" + person.username)
  }
}

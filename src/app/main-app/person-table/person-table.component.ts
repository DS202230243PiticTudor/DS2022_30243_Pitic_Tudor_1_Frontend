import {Component, Inject, OnInit} from '@angular/core';
import {PersonDetail, PersonTableService} from "./person-table.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeletePersonComponent} from "./delete-person/delete-person.component";
import {AddPersonCardComponent} from "../add-person-card/add-person-card.component";
import {EditPersonCardComponent} from "../edit-person-card/edit-person-card.component";

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})

export class PersonTableComponent implements OnInit {

  dataSource: PersonDetail[] = [];
  displayedColumns: string[] = ['edit', 'firstName', 'lastName', 'username', 'email', 'role', 'active', 'notLocked', 'delete'];
  constructor(
    private personTableService: PersonTableService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllPersons();
  }

  getAllPersons() {
    this.personTableService.getPersons().subscribe(persons => {
      this.dataSource = persons;
    });
  }

  /**
   * Wrapper function for openDeletePersonDialog. Main purpose of this function is to stop event propagation.
   * @param event MouseClickEvent to stop propagation
   * @param id Person id to be deleted
   */
  deletePerson(event: any, id: string) {
    event.stopPropagation();
    this.openDeletePersonDialog(id);
  }

  /**
   * Opens a dialog for confirming the delete. The service is called in the DeletePersonComponent upon pressing
   * the "Delete" button instead of the close button. The .afterClosed().subscribe(status => ...) just checks if the delete button was
   * pressed or not, so no service is called inside this method or inside this class.
   * @param id the id of the Person to be deleted
   */
  openDeletePersonDialog(id: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { id };
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(DeletePersonComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
    status => {
      if(status) {
        this.getAllPersons();
      }
    });
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  openAddPersonDialog($event: MouseEvent) {
    this.stopPropagation($event);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px'
    dialogConfig.height = '90%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(AddPersonCardComponent, dialogConfig )
    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.getAllPersons();
        }
      }
    );
  }

  openEditPersonDialog($event: MouseEvent, element?: PersonDetail) {
    this.stopPropagation($event);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element
    };
    dialogConfig.width = '550px'
    dialogConfig.height = '90%'
    dialogConfig.autoFocus = false
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(EditPersonCardComponent, dialogConfig )
    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.getAllPersons();
        }
      }
    );
  }

  public clickOnPersonRow(id: string) {
    this.router.navigate(['/persons/', id]);
  }
}

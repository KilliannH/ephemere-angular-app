import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewEventDialogData } from '../models/newEventDialogData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNewEventDialog() {
    let dialogRef = this.dialog.open(NewEventDialog, {
      data: {
        name: '',
        facebookId: '',
      }
    });
  }
}

@Component({
  selector: 'new-event-dialog',
  templateUrl: './new-event-dialog.html',
})
export class NewEventDialog {
  // @ts-ignore
  facebookId: string;
  // @ts-ignore
  name: string;
  constructor(
    public dialogRef: MatDialogRef<NewEventDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: NewEventDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

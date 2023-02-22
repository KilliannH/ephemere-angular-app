import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { NewEventDialogData } from '../models/newEventDialogData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private dataService: DataService) { }

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

  debug() {
    // @ts-ignore
    this.dataService.getVenues().subscribe((res) => console.log(res));
  }
}

@Component({
  selector: 'new-event-dialog',
  templateUrl: './new-event-dialog.html',
})
export class NewEventDialog {
  constructor(
    public dialogRef: MatDialogRef<NewEventDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: NewEventDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

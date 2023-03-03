import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { NewEventDialogData } from '../models/newEventDialogData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public events: any = [];

  constructor(public dialog: MatDialog, private dataService: DataService, 
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // no need to check for auth bcse authguard does it before onInit()
    this.dataService.getEvents().subscribe((events) => {
      this.events = events;
    });
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

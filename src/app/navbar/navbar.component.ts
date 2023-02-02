import { Component, OnInit } from '@angular/core';
import constants from '../constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appName: string = constants.appName
  constructor() { }

  ngOnInit(): void {
  }

}

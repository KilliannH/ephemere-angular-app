import { SocialUser } from '@abacritt/angularx-social-login';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  appName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

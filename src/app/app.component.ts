import { Component } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import constants from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = constants.appName;
  loading: boolean = true;
}

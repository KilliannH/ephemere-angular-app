import { Component } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ephemere';
  loading: boolean = true;
}

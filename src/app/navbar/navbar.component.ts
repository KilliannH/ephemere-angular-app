import { SocialUser } from '@abacritt/angularx-social-login';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  appName: string = '';

  userInfoSubscritpion$: Subscription | null = null;
  _connUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.init().then((initialized) => {
        if(initialized) {
        this.authService.getLoginStatus().then((response: any) => {
          console.log(response);
          if(response && response.status == 'connected') {
            this.authService.getUserInfos(response).then((res: any) => {
              console.log(res);
            });
          }
          this.userInfoSubscritpion$ = this.authService.userInfo$.subscribe((data) => {
            if(data) {
              this._connUser = data;
              console.log("logged in with user data: ", data);
            }
          });
        });
      }
    });
  }

  doLogout(): Promise<any> {
    return this.authService.logout().then(() => {
      console.log("FB Logged out");
      this._connUser = null;
      return this.router.navigate(['/login']);
    });
  }

}

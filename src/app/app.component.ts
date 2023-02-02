import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ephemere';
  loading: boolean = true;
  user: {email: string, username: string, facebookId: string, imageUrl: string} | undefined = undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.init().then((initialized) => {
      if(initialized) {
      this.authService.getLoginStatus().then((response: any) => {
        console.log(response);
        if(response && response.status == 'connected') {
          this.authService.getUserInfos(response.authResponse.userID).then((res: any) => {
            console.log(res);
            this.user = {email: res.email, username: res.name, facebookId: res.id, imageUrl: res.picture.data.url};
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
    });
  }
}

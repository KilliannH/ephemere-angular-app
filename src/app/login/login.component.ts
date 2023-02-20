import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import constants from '../constants';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private dataService: DataService,
    private router: Router) { }

  doSignInWithFB(): Promise<any> {
    return this.authService.signInWithFB().then((response: any) => {
      // TODO - extract this somewhere else.
      // We do an api login from every successful auth methods 
      console.log("ccc", response);
      const claims = {
        sub: {
            facebookId: response.authResponse.userID,
            accessToken: response.authResponse.accessToken
        },
        issuer: constants.appName
      }
      const userInfos = {
        id: response.userInfos.id,
        email: response.userInfos.email,
        name: response.userInfos.name,
        imageUrl: response.userInfos.picture.data.url
      }
      return this.dataService.apiLogin(claims, userInfos).then((res) => {
        console.log("doSigninWithFB",res);
        return this.router.navigate(['/home']);
      });
    });
  }
}

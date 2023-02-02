import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { BehaviorSubject } from 'rxjs';
import config from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userInfo$ = new BehaviorSubject<any>(null);

  initParams: InitParams = {
    appId: config.fbAppId,
    version: 'v15.0'
  };
  constructor(private fb: FacebookService) { }

  init(): Promise<Boolean> {
    return this.fb.init(this.initParams).then((res) => {
        console.log("FB Initialized");
        return true;
    }).catch((e) => {
      console.log(e);
      return false;
    });
  }

  signInWithFB(): Promise<Object> {
    return this.fb.login().then((value: LoginResponse) => {
      console.log("signingWithFB", value);
      return this.getUserInfos(value.authResponse.userID);
    });
  }

  getLoginStatus(): Promise<Object> {
    return this.fb.getLoginStatus();
  }

  logout(): Promise<any> {
    return this.fb.logout().then((value) => {
      console.log("Logged out", value);
    });
  }

  getUserInfos(userID: string): Promise<any> {
      return this.fb.api(
        '/' + userID,
        'get',
        {"fields":"id,name,email,picture{url}"}).then((res) => {
          const userInfo = {email: res.email, username: res.name, facebookId: res.id, imageUrl: res.picture.data.url};
          // TODO - remember to cancel behaviorSubject on logout
          // see https://stackoverflow.com/questions/72556131/rxjs-behavioralsubject-for-storing-logged-in-user-data-in-angular-12
          this.userInfo$.next(userInfo);
          return res;
        });
  }
}

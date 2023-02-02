import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import config from './config';
import { UserDB } from './models/userDB';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user :UserDB | null = null;

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
      return value;
    });
  }

  getLoginStatus(): Promise<Object> {
    return this.fb.getLoginStatus();
  }

  logout(): void {
  }

  getUserInfos(userID: string): Promise<any> {
      return this.fb.api(
        '/' + userID,
        'get',
        {"fields":"id,name,email,picture{url}"}).then((response) => {
          console.log("getUserInfos", response);
          return response;
        });
  }
}

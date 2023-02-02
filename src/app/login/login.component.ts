import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../auth.service';
import constants from '../constants';
import { DataService } from '../data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  
  constructor(private authService: AuthService, private dataService: DataService) { }

  doSignInWithFB(): Promise<void> {
    return this.authService.signInWithFB().then((response: any) => {
      // TODO - extract this somewhere else.
      // We do an api login from every successful auth methods 
      const claims = {
        sub: {
            facebookId: response.authResponse.userID,
            accessToken: response.authResponse.accessToken
        },
        issuer: constants.appName
      }
      return this.dataService.apiLogin(claims).then((res) => console.log(res));
    });
  }

  doLogout(): void {
    this.authService.logout();
  }
}

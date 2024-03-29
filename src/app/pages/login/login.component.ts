import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginResponseData, LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { STRINGS } from 'src/app/constants/strings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private cookieValue = '';
  error: string = '';
  strings = STRINGS;
  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) {}

  clearError(){
    this.error = '';
  }

  ngOnInit(){
    if (this.cookieService.check(this.strings.cookieName)){
      this.router.navigate([this.strings.redirectToCreate]);
      return;
    }
  }
  onSubmit(form: NgForm) {

    // extra validation if form.valid
    // been tempered in dev tools
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let loginObs: Observable<LoginResponseData>;

    loginObs = this.loginService.signin(email, password);

    loginObs.subscribe(
      (resData) => {
        if (resData.res === this.strings.unknownRequestResponse){
          this.error = this.strings.unknownRequestResponse;
        } else {
          this.cookieService.set(this.strings.cookieName, resData.token, {expires:2});
          this.router.navigate([this.strings.redirectToCreate]);
        }
      },
      (errorMessage) => {
        console.log(errorMessage.res);
      }
    );
    form.reset();
  }
}

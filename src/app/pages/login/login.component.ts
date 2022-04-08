import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginResponseData, LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private cookieValue = '';
  error: string = '';
  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) {}

  clearError(){
    this.error = '';
  }
  onSubmit(form: NgForm) {

    if (this.cookieService.check('getpackage')){
      console.log('Cookie found');
      this.router.navigate(['/create']);
      return;
    }

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
        console.log(resData.res);
        if (resData.res === 'unknown request'){
          this.error = 'Unknown Request';
        } else {
          this.cookieService.set('getpackage',resData.token);
          console.log('Success ! cookie - ' + this.cookieService.get('getpackage'));
          this.router.navigate(['/create']);
        }
      },
      (errorMessage) => {
        console.log(errorMessage.res);
      }
    );
    form.reset();
  }
}

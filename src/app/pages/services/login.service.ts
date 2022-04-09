import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, TimeoutError } from 'rxjs';


export interface LoginResponseData {
  id: string;
  token: string;
  res: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  signin(email: string, password: string) {

    let apiUrl = 'https://mock-stg.getpackage-dev.com/login';
    return this.http.post<LoginResponseData>(apiUrl, {
      email: email,
      password: password
    })
    .pipe(catchError((error) => {
      if (error instanceof TimeoutError) {
        return throwError('Timeout Exception');
     }
     return throwError(error.message);
    }));
  }

}

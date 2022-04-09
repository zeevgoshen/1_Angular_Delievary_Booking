import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface OrderResponseData {
  id: string;
  token: string;
  res: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}


  signin(email: string, password: string) {

    let apiUrl = 'https://mock-stg.getpackage-dev.com/submit';
    return this.http.post<OrderResponseData>(apiUrl, {

      //,returnSecureToken: true,
    })
    //.pipe(catchError(this.handleError));
  }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occured';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch(errorRes.error.error.message){
  //     case 'unknown request':
  //       errorMessage = 'adsds';

  //   }
  //   return throwError(errorMessage);
  // }
}

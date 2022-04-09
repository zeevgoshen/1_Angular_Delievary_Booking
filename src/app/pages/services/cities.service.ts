import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, throwError, TimeoutError } from 'rxjs';


export interface CitiesResponseData {
  id: string;
  price: number;
  enName: string;
  hebName: string;
}

@Injectable({ providedIn: 'root' })
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities() {
    let apiUrl = 'https://mock-stg.getpackage-dev.com/cities';
    return this.http.get<{[key:string]: CitiesResponseData}>(apiUrl)
    .pipe(
      map(responseData => {
      const citiesArray = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)){
          citiesArray.push({...responseData[key], id: key});
        }
      }
      return citiesArray;
    }))
    .pipe(catchError((error) => {
      if (error instanceof TimeoutError) {
        return throwError('Timeout Exception');
     }
     return throwError(error.message);
    }));
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

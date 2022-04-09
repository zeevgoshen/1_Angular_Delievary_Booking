import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';


export interface CitiesResponseData {
  id: string;
  price: string;
  enName: string;
  hebName: string;
}

@Injectable({ providedIn: 'root' })
export class CitiesService {
  constructor(private http: HttpClient) {}


  //error = null;

  getCities() {
    let apiUrl = 'https://mock-stg.getpackage-dev.com/cities';
    //let apiUrl = 'https://624f21d78c5bf4a10547173b.mockapi.io/login/';
    // return this.http.get<CitiesResponseData>(apiUrl, {
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

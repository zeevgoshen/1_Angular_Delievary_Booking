import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, throwError, TimeoutError } from 'rxjs';


export interface ScheduleResponseData {
  day: string;
  id: string;
  times: string[];
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getHours() {
    let apiUrl = 'https://mock-stg.getpackage-dev.com/times';
    return this.http.get<{[key:string]: ScheduleResponseData}>(apiUrl)
    .pipe(
      map(responseData => {
      const hoursArray = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)){
          hoursArray.push({...responseData[key], id: key});
        }
      }
      return hoursArray;
    }))
    .pipe(catchError((error) => {
      if (error instanceof TimeoutError) {
        return throwError('Timeout Exception');
     }
     return throwError(error.message);
    }));
  }
}

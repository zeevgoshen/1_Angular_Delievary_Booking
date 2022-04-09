import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { STRINGS } from 'src/app/constants/strings';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { CitiesResponseData, CitiesService } from '../services/cities.service';
import { Observable } from 'rxjs';
import {
  ScheduleResponseData,
  ScheduleService,
} from '../services/schedule.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  loadedCities: CitiesResponseData[] = [];
  loadedHours: ScheduleResponseData[] = [];
  filteredLoadedHours: ScheduleResponseData[] = [];
  events: string[] = [];
  strings = STRINGS;
  error = '';
  minDate = new Date();
  selectedCity?: CitiesResponseData;
  selectedTime?: ScheduleResponseData;
  constructor(
    private citiesService: CitiesService,
    private scheduleService: ScheduleService
  ) {}

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Israel];

  phoneForm_sender = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  phoneForm_receiver = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  // onChange() {
  //   this.phoneForm_sender.valueChanges.subscribe((selectedValue) => {
  //     if (this.phoneForm_sender.valid) {
  //       this.error = '';
  //     }
  //     // console.log('form value changed')

  //     // console.log(selectedValue)
  //   });
  // }

  onSelect(city: CitiesResponseData): void {
    this.selectedCity = city;
  }
  ngOnInit() {
    this.phoneForm_sender.valueChanges.subscribe((selectedValue) => {
      if (this.phoneForm_sender.valid) {
        this.error = '';
      }
    });

    let citiesArray = this.citiesService.getCities().subscribe((cities) => {
      this.loadedCities = cities;
      //console.log('cities' + cities);
    });

    let hoursArray = this.scheduleService.getHours().subscribe((hours) => {
      this.loadedHours = hours;
      //console.log('cities' + hours);

      //this.filteredLoadedHours = this.loadedHours.filter(day => day.day === sele)
    });

    // citiesObs.subscribe(
    //   (resData) => {
    //     console.log(resData.res);
    //     if (resData.res === this.strings.unknownRequestResponse){
    //       this.error = this.strings.unknownRequestResponse;
    //     } else {

    //     }
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage.res);
    //   }
    // );
    //form.reset();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day != 6; // 1 means monday, 0 means sunday, etc.
  };

  onSubmit(form: NgForm) {
    if (!this.phoneForm_sender.valid || !this.phoneForm_receiver.valid) {
      this.error = this.strings.problemInForm;
      return;
    } else {
      this.error = '';
    }
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.Israel];
  }
}

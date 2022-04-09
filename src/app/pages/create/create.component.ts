import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { STRINGS } from 'src/app/constants/strings';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { CitiesResponseData, CitiesService } from '../services/cities.service';
import { Observable, Subject, from } from 'rxjs';
import {
  ScheduleResponseData,
  ScheduleService,
} from '../services/schedule.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';

const subject = new Subject<ScheduleResponseData>();

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  loadedCities: CitiesResponseData[] = [];
  allLoadedHours: ScheduleResponseData[] = [];
  loadedHours: ScheduleResponseData[] = [];
  filteredLoadedHours: ScheduleResponseData[] = [];
  events: string[] = [];
  strings = STRINGS;
  error = '';
  minDate = new Date();
  sender_City?: CitiesResponseData;
  receiver_City?: CitiesResponseData;
  selectedTime?: ScheduleResponseData;

  constructor(
    private citiesService: CitiesService,
    private scheduleService: ScheduleService,
    private cookieService: CookieService
  ) {}

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Israel];

  senderPrice = 0;
  receiverPrice = 0;

  phoneForm_sender = new FormGroup({
    sender_phone: new FormControl(undefined, [Validators.required]),
  });

  phoneForm_receiver = new FormGroup({
    receiver_phone: new FormControl(undefined, [Validators.required]),
  });

  hoursArray = [];

  datePicker = new FormGroup({
    releasedAt: new FormControl(),
  });

  onCityChange(newCity: MatSelectChange){
    console.log(newCity.value);
    let price = this.loadedCities.filter(city => city.enName === newCity.value);

    //price[0].price

  }
  onSenderSelectedCity(city: CitiesResponseData): void {
    this.sender_City = city;
    this.senderPrice = city.price;
  }

  onReceiverSelectedCity(city: CitiesResponseData): void {
    this.receiver_City = city;
    this.receiverPrice = city.price;
  }

  ngOnInit() {
    if (!this.cookieService.check(this.strings.getCitiesCookie)) {
      let citiesArray = this.citiesService.getCities().subscribe((cities) => {
        this.loadedCities = cities;
        this.cookieService.set(
          this.strings.getCitiesCookie,
          JSON.stringify(cities),
          { expires: 2 }
        );
      });
    } else {
      this.loadedCities = JSON.parse(
        this.cookieService.get(this.strings.getCitiesCookie)
      );
    }

    if (!this.cookieService.check(this.strings.getHoursCookie)) {
      let hoursArray = this.scheduleService.getHours().subscribe((hours) => {
        this.cookieService.set(
          this.strings.getHoursCookie,
          JSON.stringify(hours),
          { expires: 2 }
        );
        this.loadedHours = hours;
        this.allLoadedHours = hours;
      });
    } else {
      this.loadedHours = JSON.parse(
        this.cookieService.get(this.strings.getHoursCookie)
      );
      this.allLoadedHours = JSON.parse(
        this.cookieService.get(this.strings.getHoursCookie)
      );
    }

    subject.subscribe({
      // Correct times are shown according to the date,
      // but needs parsing using map and split on ',' probably
      next: (v) => (this.loadedHours = this.filteredLoadedHours),
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = [];
    this.events.push(`${type}: ${event.value}`);

    let pickerDate = new Date(this.events.toLocaleString());

    if (this.loadedHours.length === 1 || this.loadedHours.length === 0) {
      this.filteredLoadedHours = this.allLoadedHours.filter(
        (day) => day.day == this.getDayName(pickerDate, 'en-US')
      );
    } else {
      this.filteredLoadedHours = this.loadedHours.filter(
        (day) => day.day == this.getDayName(pickerDate, 'en-US')
      );
    }

    subject.next(this.filteredLoadedHours[0]);
  }

  getDayName = (dateStr: Date, locale: string) => {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'short' });
  };

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

      alert(this.strings.submitForm);
      // retreive token cookie
      let token = this.cookieService.get(this.strings.cookieName);
      // use post service to send order
      // show success modal/message

      form.reset();
    }
  }
}

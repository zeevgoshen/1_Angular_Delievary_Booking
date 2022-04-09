import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { STRINGS } from 'src/app/constants/strings';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../../store/actions/counter.action';



@Component({
  selector: 'PhoneNumber',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})



export class PhoneComponent {

  count$: Observable<number>

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');

    // this.phoneForm.valueChanges.subscribe(val => {
    //   //this.message = val;
    // });
  }

  increment() {
    this.store.dispatch(increment());
  }


  ngOnInit(){

    // this.phoneForm.valueChanges.subscribe(selectedValue  => {
    //   this.error = '';
    //   if (this.phoneForm.valid) {
    //     this.error = '';
    //   }
    // })
  }

  strings = STRINGS;
  error = '';
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Israel];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

  // @Output() newItemEvent = new EventEmitter<FormGroup>();

  // addNewItem(value: FormGroup) {
  //   this.newItemEvent.emit(value);
  // }

  onChange(){

  }
  onSubmit() {


    // if(!this.phoneForm.valid){
    //   this.error = this.strings.problemInForm;
    //   return;
    // }
    // else{
    //   this.error = '';
    // }
  }

}

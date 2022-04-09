import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/create/create.component';
import { PriceComponent } from './components/price.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './shared/store/reducers/counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'create', component: CreateComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    MyCounterComponent,
    PriceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      count: counterReducer,
    }),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

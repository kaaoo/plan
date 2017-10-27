import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LocalStorageService } from './calendar/share/localstorage-service';
import { DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    BrowserModule,
    DialogModule,
    FormsModule,
    Ng2DatetimePickerModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

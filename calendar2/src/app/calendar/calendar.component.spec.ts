/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule, CalendarUtils, CalendarDateFormatter } from 'angular-calendar';
import { LocalStorageService } from './share/localstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventType } from './share/my-event';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CalendarModule.forRoot(), BrowserAnimationsModule],
      declarations: [CalendarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [LocalStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the calendar app', async(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('check areOverriding method', () => {
    fixture = TestBed.createComponent(CalendarComponent);
    const comp = fixture.componentInstance;
    const event = {
      type: EventType.Meeting,
      isNew: true,
      title: 'New event',
      start: new Date(),
      end: new Date(),
      color: { primary: '#ad2121', secondary: '#FAE3E3' }
    };

    comp.ngOnInit();
    // saving event
    comp.events.push(event);
    comp.saveInLocalStorage();

    comp.events.push(event);
    expect(comp.checkIfDatesOverlapping()).toBe(false);
  });
});

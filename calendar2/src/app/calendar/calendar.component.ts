import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { isSameMonth, isSameDay, startOfDay, endOfDay, max, min, areRangesOverlapping } from 'date-fns';

import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarModule } from 'angular-calendar';
import { MyEvent, EventType } from './share/my-event';
import { LocalStorageService } from './share/localstorage-service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {

  displayModal = false;
  dialogMessage: string;
  dialogHeader: string;
  checkTime = false;

  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  eventType: EventType;

  events: MyEvent[];

  activeDayIsOpen = true;

  constructor(private service: LocalStorageService) {
  }

  ngOnInit(): void {
    this.events = this.service.createEvents(colors);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  saveInLocalStorage(): void {
    if (this.checkTime) {
      if (this.checkIfDatesOverlapping()) {
        this.dialogMessage = 'Time is already occupied by another event';
        this.dialogHeader = 'Warning!';
        this.displayModal = true;
        return;
      }
    }

    this.events = this.service.updateEvents(this.events);
    this.dialogMessage = 'Data was saved';
    this.dialogHeader = 'Success!';
    this.displayModal = true;

    this.refresh.next();
  }

  checkIfDatesOverlapping(): boolean {
    const newEvents = this.events.filter(x => {
      return x.isNew;
    });
    const allEvents = this.service.getAllEvents();
    for (let y = 0; y < newEvents.length; y++) {
      for (let x = 0; x < allEvents.length; x++) {
        if (areRangesOverlapping(newEvents[y].start, newEvents[y].end, allEvents[y].start, allEvents[y].end)) {
          return true;
        }
      }
    }

    return false;
  }

  addEvent(): void {
    this.events.push({
      type: EventType.Meeting,
      isNew: true,
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.blue
    });
  }
}

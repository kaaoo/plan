import { MyEvent, EventType } from './my-event';
import { Injectable } from '@angular/core';
import { subDays, addDays, startOfDay, endOfMonth, addHours } from 'date-fns';

const EventsName = 'events';
@Injectable()
export class LocalStorageService {
    getAllEvents(): MyEvent[] {
        return JSON.parse(localStorage.getItem(EventsName));
    }

    updateEvents(events: MyEvent[]): MyEvent[] {
        events.forEach(x => {
            x.isNew = false;
        });
        localStorage.setItem(EventsName, JSON.stringify(events));
        return events;
    }

    putEvents(events: MyEvent[]) {
        localStorage.setItem(EventsName, JSON.stringify(events));
    }

    createEvents(colors): MyEvent[] {
        const events = [
            {
                type: EventType.Meeting,
                isNew: false,
                start: subDays(startOfDay(new Date()), 1),
                end: addDays(new Date(), 1),
                title: 'A 3 day event',
                color: colors.red
            },
            {
                type: EventType.Appointment,
                isNew: false,
                start: startOfDay(new Date()),
                end: addDays(new Date(), 1),
                title: 'One more event',
                color: colors.yellow
            },
            {
                type: EventType.Reminder,
                isNew: false,
                start: subDays(endOfMonth(new Date()), 3),
                end: addDays(endOfMonth(new Date()), 3),
                title: 'A long event',
                color: colors.blue
            },
            {
                type: 1,
                isNew: false,
                start: addHours(startOfDay(new Date()), 2),
                end: new Date(),
                title: 'Event #4',
                color: colors.yellow
            }
        ];
        localStorage.setItem(EventsName, JSON.stringify(events));
        return events;
    }
}

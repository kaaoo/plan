import { CalendarEvent } from 'angular-calendar';

export interface MyEvent extends CalendarEvent {
    type: EventType;
    isNew: boolean;
}

export enum EventType {
    Meeting,
    Reminder,
    Appointment
}
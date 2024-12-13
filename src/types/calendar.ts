export type EventColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple';

export interface Event {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	description?: string;
	color: EventColor;
}

export interface Day {
	date: Date;
	events: Event[];
}

export interface CalendarState {
	currentMonth: Date;
	selectedDay: Date | null;
	days: Day[];
}

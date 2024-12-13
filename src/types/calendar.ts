export interface Event {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    description?: string;
    color?: string;
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
  
  
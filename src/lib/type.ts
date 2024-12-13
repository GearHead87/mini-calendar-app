export interface Event {
    id: string;
    name: string;
    date: Date;
    startTime: string;
    endTime: string;
    description?: string;
    color?: string;
  }
  
  export interface CalendarDay {
    date: Date;
    dayOfMonth: number;
    isCurrentMonth: boolean;
    events: Event[];
    isToday: boolean;
  }
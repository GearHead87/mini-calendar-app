import { useState, useEffect } from 'react';
import { CalendarState, Event, Day } from '../types/calendar';
import { getMonthData, formatDate } from '../utils/dateUtils';

export function useCalendar() {
  const [state, setState] = useState<CalendarState>({
    currentMonth: new Date(),
    selectedDay: null,
    days: [],
  });

  useEffect(() => {
    const monthData = getMonthData(state.currentMonth);
    const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');

    const days: Day[] = monthData.map((date) => ({
      date,
      events: storedEvents[formatDate(date)] || [],
    }));

    setState((prevState) => ({ ...prevState, days }));
  }, [state.currentMonth]);

  const selectDay = (date: Date) => {
    setState((prevState) => ({ ...prevState, selectedDay: date }));
  };

  const nextMonth = () => {
    setState((prevState) => ({
      ...prevState,
      currentMonth: new Date(prevState.currentMonth.getFullYear(), prevState.currentMonth.getMonth() + 1, 1),
    }));
  };

  const prevMonth = () => {
    setState((prevState) => ({
      ...prevState,
      currentMonth: new Date(prevState.currentMonth.getFullYear(), prevState.currentMonth.getMonth() - 1, 1),
    }));
  };

  const addEvent = (event: Event) => {
    const dateKey = formatDate(new Date(event.startTime));
    const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
    const updatedEvents = {
      ...storedEvents,
      [dateKey]: [...(storedEvents[dateKey] || []), event],
    };
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    setState((prevState) => ({
      ...prevState,
      days: prevState.days.map((day) =>
        formatDate(day.date) === dateKey ? { ...day, events: updatedEvents[dateKey] } : day
      ),
    }));
  };

  const updateEvent = (updatedEvent: Event) => {
    const dateKey = formatDate(new Date(updatedEvent.startTime));
    const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
    const updatedEvents = {
      ...storedEvents,
      [dateKey]: (storedEvents[dateKey] || []).map((event: Event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    };
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    setState((prevState) => ({
      ...prevState,
      days: prevState.days.map((day) =>
        formatDate(day.date) === dateKey ? { ...day, events: updatedEvents[dateKey] } : day
      ),
    }));
  };

  const deleteEvent = (eventId: string, date: Date) => {
    const dateKey = formatDate(date);
    const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
    const updatedEvents = {
      ...storedEvents,
      [dateKey]: (storedEvents[dateKey] || []).filter((event: Event) => event.id !== eventId),
    };
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    setState((prevState) => ({
      ...prevState,
      days: prevState.days.map((day) =>
        formatDate(day.date) === dateKey ? { ...day, events: updatedEvents[dateKey] } : day
      ),
    }));
  };

  return {
    state,
    selectDay,
    nextMonth,
    prevMonth,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}


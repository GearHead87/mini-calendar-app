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
			currentMonth: new Date(
				prevState.currentMonth.getFullYear(),
				prevState.currentMonth.getMonth() + 1,
				1
			),
		}));
	};

	const prevMonth = () => {
		setState((prevState) => ({
			...prevState,
			currentMonth: new Date(
				prevState.currentMonth.getFullYear(),
				prevState.currentMonth.getMonth() - 1,
				1
			),
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

	const moveEvent = (eventId: string, sourceDate: Date, targetDate: Date) => {
		const sourceDateKey = formatDate(sourceDate);
		const targetDateKey = formatDate(targetDate);

		// If the source and target dates are the same, do nothing
		if (sourceDateKey === targetDateKey) {
			return;
		}

		const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');

		const eventToMove = storedEvents[sourceDateKey].find(
			(event: Event) => event.id === eventId
		);
		const updatedSourceEvents = storedEvents[sourceDateKey].filter(
			(event: Event) => event.id !== eventId
		);

		// Calculate the time difference between the source and target dates
		const timeDifference = targetDate.getTime() - sourceDate.getTime();

		// Update the start and end times of the event
		const updatedEvent = {
			...eventToMove,
			startTime: new Date(
				new Date(eventToMove.startTime).getTime() + timeDifference
			).toISOString(),
			endTime: new Date(
				new Date(eventToMove.endTime).getTime() + timeDifference
			).toISOString(),
		};

		const updatedTargetEvents = [...(storedEvents[targetDateKey] || []), updatedEvent];

		const updatedEvents = {
			...storedEvents,
			[sourceDateKey]: updatedSourceEvents,
			[targetDateKey]: updatedTargetEvents,
		};

		localStorage.setItem('events', JSON.stringify(updatedEvents));

		setState((prevState) => ({
			...prevState,
			days: prevState.days.map((day) => {
				if (formatDate(day.date) === sourceDateKey) {
					return { ...day, events: updatedSourceEvents };
				}
				if (formatDate(day.date) === targetDateKey) {
					return { ...day, events: updatedTargetEvents };
				}
				return day;
			}),
		}));
	};

	const exportEvents = (format: 'json' | 'csv') => {
		const storedEvents = JSON.parse(localStorage.getItem('events') || '{}') as Event;

		if (format === 'json') {
			const jsonString = JSON.stringify(storedEvents, null, 2);
			const blob = new Blob([jsonString], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'calendar_events.json';
			link.click();
		} else if (format === 'csv') {
			const csvRows = [['Date', 'Name', 'Start Time', 'End Time', 'Description', 'Color']];
			Object.entries(storedEvents).forEach(([date, events]: [string, Event[]]) => {
				events.forEach((event) => {
					csvRows.push([
						date,
						event.name,
						event.startTime,
						event.endTime,
						event.description || '',
						event.color,
					]);
				});
			});
			const csvContent = csvRows.map((row) => row.join(',')).join('\n');
			const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'calendar_events.csv';
			link.click();
		}
	};

	return {
		state,
		selectDay,
		nextMonth,
		prevMonth,
		addEvent,
		updateEvent,
		deleteEvent,
		moveEvent,
		exportEvents,
	};
}

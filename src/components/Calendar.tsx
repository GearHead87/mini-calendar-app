import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { useCalendar } from '../hooks/useCalendar';
import { Day } from './Day';
import { EventForm } from './EventForm';
import { EventList } from './EventList';
import { isSameDay } from '../utils/dateUtils';
import { Event } from '../types/calendar';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar() {
	const {
		state,
		selectDay,
		nextMonth,
		prevMonth,
		addEvent,
		updateEvent,
		deleteEvent,
		moveEvent,
		exportEvents,
	} = useCalendar();
	const [showEventForm, setShowEventForm] = useState(false);
	const [showEventList, setShowEventList] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);

	const handleDayClick = (date: Date) => {
		selectDay(date);
		setShowEventList(true);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const sourceDate = new Date(result.source.droppableId);
		const destinationDate = new Date(result.destination.droppableId);
		const eventId = result.draggableId;

		if (sourceDate.getTime() !== destinationDate.getTime()) {
			moveEvent(eventId, sourceDate, destinationDate);
		}
	};

	const handleEditEvent = (event: Event) => {
		setEditingEvent(event);
		setShowEventForm(true);
	};

	const handleUpdateEvent = (updatedEvent: Event) => {
		updateEvent(updatedEvent);
		setEditingEvent(null);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">
						{state.currentMonth.toLocaleString('default', {
							month: 'long',
							year: 'numeric',
						})}
					</h2>
					<div>
						<Button onClick={prevMonth}>Previous</Button>
						<Button onClick={nextMonth} className="ml-2">
							Next
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-7 gap-1 mb-4">
					{DAYS_OF_WEEK.map((day) => (
						<div key={day} className="text-center font-semibold">
							{day}
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 gap-1">
					{state.days.map((day, index) => (
						<Day
							key={index}
							day={day}
							isCurrentMonth={day.date.getMonth() === state.currentMonth.getMonth()}
							isToday={isSameDay(day.date, new Date())}
							isSelected={
								state.selectedDay ? isSameDay(day.date, state.selectedDay) : false
							}
							onClick={() => handleDayClick(day.date)}
							index={index}
						/>
					))}
				</div>
				<div className="mt-4 flex justify-between">
					<Button onClick={() => setShowEventForm(true)}>Add Event</Button>
					<div>
						<Button onClick={() => exportEvents('json')} className="mr-2">
							Export JSON
						</Button>
						<Button onClick={() => exportEvents('csv')}>Export CSV</Button>
					</div>
				</div>
				<EventForm
					isOpen={showEventForm}
					onClose={() => {
						setShowEventForm(false);
						setEditingEvent(null);
					}}
					onSubmit={editingEvent ? handleUpdateEvent : addEvent}
					initialEvent={editingEvent}
				/>
				{state.selectedDay && (
					<EventList
						isOpen={showEventList}
						onClose={() => setShowEventList(false)}
						events={
							state.days.find((day) => isSameDay(day.date, state.selectedDay!))
								?.events || []
						}
						onUpdateEvent={handleEditEvent}
						onDeleteEvent={(eventId) => deleteEvent(eventId, state.selectedDay!)}
					/>
				)}
			</div>
		</DragDropContext>
	);
}

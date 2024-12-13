import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Day as DayType, Event } from '../types/calendar';

interface DayProps {
	day: DayType;
	isCurrentMonth: boolean;
	isToday: boolean;
	isSelected: boolean;
	onClick: () => void;
	index: number;
}

function EventItem({ event, index }: { event: Event; index: number }) {
	const colorClasses = {
		red: 'bg-red-200 text-red-800',
		blue: 'bg-blue-200 text-blue-800',
		green: 'bg-green-200 text-green-800',
		yellow: 'bg-yellow-200 text-yellow-800',
		purple: 'bg-purple-200 text-purple-800',
	};

	return (
		<Draggable draggableId={event.id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`text-xs truncate p-1 mb-1 rounded ${colorClasses[event.color]}`}
				>
					{event.name}
				</div>
			)}
		</Draggable>
	);
}

export function Day({ day, isCurrentMonth, isToday, isSelected, onClick }: DayProps) {
	const dayClasses = [
		'p-2 border',
		isCurrentMonth ? 'bg-white' : 'bg-gray-100',
		isToday ? 'border-blue-500' : '',
		isSelected ? 'bg-blue-100' : '',
		'cursor-pointer hover:bg-blue-50',
		'h-32 overflow-y-auto',
	].join(' ');

	return (
		<Droppable droppableId={day.date.toISOString()}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className={dayClasses}
					onClick={onClick}
				>
					<div
						className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}
					>
						{day.date.getDate()}
					</div>
					{day.events.map((event, eventIndex) => (
						<EventItem key={event.id} event={event} index={eventIndex} />
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}

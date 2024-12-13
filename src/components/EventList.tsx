import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Event } from '../types/calendar';

interface EventListProps {
	isOpen: boolean;
	onClose: () => void;
	events: Event[];
	onUpdateEvent: (event: Event) => void;
	onDeleteEvent: (eventId: string) => void;
}

const colorClasses = {
	red: 'bg-red-200 text-red-800',
	blue: 'bg-blue-200 text-blue-800',
	green: 'bg-green-200 text-green-800',
	yellow: 'bg-yellow-200 text-yellow-800',
	purple: 'bg-purple-200 text-purple-800',
};

export function EventList({
	isOpen,
	onClose,
	events,
	onUpdateEvent,
	onDeleteEvent,
}: EventListProps) {
	const [filter, setFilter] = useState('');

	const filteredEvents = events.filter((event) =>
		event.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Events</DialogTitle>
				</DialogHeader>
				<Input
					placeholder="Filter events"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="mb-4"
				/>
				<div className="space-y-4">
					{filteredEvents.map((event) => (
						<div
							key={event.id}
							className={`flex justify-between items-center p-2 rounded ${
								colorClasses[event.color]
							}`}
						>
							<div>
								<h3 className="font-semibold">{event.name}</h3>
								<p className="text-sm">
									{new Date(event.startTime).toLocaleString()} -{' '}
									{new Date(event.endTime).toLocaleString()}
								</p>
								{event.description && (
									<p className="text-sm mt-1">{event.description}</p>
								)}
							</div>
							<div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => onUpdateEvent(event)}
									className="mr-2"
								>
									Edit
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => onDeleteEvent(event.id)}
								>
									Delete
								</Button>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

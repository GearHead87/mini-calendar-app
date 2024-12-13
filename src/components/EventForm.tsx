import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Event, EventColor } from '../types/calendar';

interface EventFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (event: Event) => void;
	initialEvent?: Event | null;
}

const colorOptions: EventColor[] = ['red', 'blue', 'green', 'yellow', 'purple'];

export function EventForm({ isOpen, onClose, onSubmit, initialEvent }: EventFormProps) {
	const [event, setEvent] = useState<Event>(
		initialEvent || {
			id: '',
			name: '',
			startTime: '',
			endTime: '',
			description: '',
			color: 'blue',
		}
	);

	useEffect(() => {
		if (initialEvent) {
			setEvent(initialEvent);
		}
	}, [initialEvent]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ ...event, id: event.id || Date.now().toString() });
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{initialEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Input
							placeholder="Event name"
							value={event.name}
							onChange={(e) => setEvent({ ...event, name: e.target.value })}
							required
						/>
						<Input
							type="datetime-local"
							value={event.startTime.slice(0, 16)}
							onChange={(e) =>
								setEvent({
									...event,
									startTime: new Date(e.target.value).toISOString(),
								})
							}
							required
						/>
						<Input
							type="datetime-local"
							value={event.endTime.slice(0, 16)}
							onChange={(e) =>
								setEvent({
									...event,
									endTime: new Date(e.target.value).toISOString(),
								})
							}
							required
						/>
						<Textarea
							placeholder="Description (optional)"
							value={event.description}
							onChange={(e) => setEvent({ ...event, description: e.target.value })}
						/>
						<Select
							value={event.color}
							onValueChange={(color: EventColor) => setEvent({ ...event, color })}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a color" />
							</SelectTrigger>
							<SelectContent>
								{colorOptions.map((color) => (
									<SelectItem key={color} value={color}>
										<div className="flex items-center">
											<div
												className={`w-4 h-4 rounded-full mr-2 bg-${color}-500`}
											></div>
											{color.charAt(0).toUpperCase() + color.slice(1)}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<DialogFooter className="mt-4">
						<Button type="submit">{initialEvent ? 'Update' : 'Add'}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

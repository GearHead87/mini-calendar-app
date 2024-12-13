import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Label } from '@/components/ui/label';
import { Event, EventColor } from '../types/calendar';

interface EventFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (event: Event) => void;
	initialEvent?: Event | null;
}

const colorOptions: EventColor[] = ['red', 'blue', 'green', 'yellow', 'purple'];

const eventSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Event name is required'),
	startTime: z.string().min(1, 'Start time is required'),
	endTime: z.string().min(1, 'End time is required'),
	description: z.string().optional(),
	color: z.enum(['red', 'blue', 'green', 'yellow', 'purple'] as const),
});

type EventFormData = z.infer<typeof eventSchema>;

export function EventForm({ isOpen, onClose, onSubmit, initialEvent }: EventFormProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EventFormData>({
		resolver: zodResolver(eventSchema),
		defaultValues: initialEvent || {
			id: '',
			name: '',
			startTime: '',
			endTime: '',
			description: '',
			color: 'blue',
		},
	});

	const onSubmitForm = (data: EventFormData) => {
		onSubmit({ ...data, id: data.id || Date.now().toString() });
		onClose();
		reset();
	};

	React.useEffect(() => {
		if (initialEvent) {
			reset(initialEvent);
		}
	}, [initialEvent, reset]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{initialEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Event Name</Label>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input id="name" placeholder="Event name" {...field} />
								)}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm">{errors.name.message}</p>
							)}
						</div>

						<div>
							<Label htmlFor="startTime">Start Time</Label>
							<Controller
								name="startTime"
								control={control}
								render={({ field }) => (
									<Input
										id="startTime"
										type="datetime-local"
										{...field}
										value={field.value ? field.value.slice(0, 16) : ''}
										onChange={(e) =>
											field.onChange(new Date(e.target.value).toISOString())
										}
									/>
								)}
							/>
							{errors.startTime && (
								<p className="text-red-500 text-sm">{errors.startTime.message}</p>
							)}
						</div>

						<div>
							<Label htmlFor="endTime">End Time</Label>
							<Controller
								name="endTime"
								control={control}
								render={({ field }) => (
									<Input
										id="endTime"
										type="datetime-local"
										{...field}
										value={field.value ? field.value.slice(0, 16) : ''}
										onChange={(e) =>
											field.onChange(new Date(e.target.value).toISOString())
										}
									/>
								)}
							/>
							{errors.endTime && (
								<p className="text-red-500 text-sm">{errors.endTime.message}</p>
							)}
						</div>

						<div>
							<Label htmlFor="description">Description (Optional)</Label>
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<Textarea
										id="description"
										placeholder="Description"
										{...field}
									/>
								)}
							/>
						</div>

						<div>
							<Label htmlFor="color">Event Color</Label>
							<Controller
								name="color"
								control={control}
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger id="color">
											<SelectValue placeholder="Select a color" />
										</SelectTrigger>
										<SelectContent>
											{colorOptions.map((color) => (
												<SelectItem key={color} value={color}>
													<div className="flex items-center">
														<div
															className={`w-4 h-4 rounded-full mr-2 ${
																{
																	red: 'bg-red-500',
																	blue: 'bg-blue-500',
																	green: 'bg-green-500',
																	yellow: 'bg-yellow-500',
																	purple: 'bg-purple-500',
																}[color]
															}`}
														></div>
														{color.charAt(0).toUpperCase() +
															color.slice(1)}
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
							{errors.color && (
								<p className="text-red-500 text-sm">{errors.color.message}</p>
							)}
						</div>
					</div>
					<DialogFooter className="mt-4">
						<Button type="submit">{initialEvent ? 'Update' : 'Add'}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

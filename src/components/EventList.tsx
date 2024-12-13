import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Event } from '../types/calendar';
import { EventForm } from './EventForm';

interface EventListProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onUpdateEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
}

export function EventList({ isOpen, onClose, events, onUpdateEvent, onDeleteEvent }: EventListProps) {
  const [filter, setFilter] = useState('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

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
            <div key={event.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
                </p>
                {event.description && <p className="text-sm">{event.description}</p>}
              </div>
              <div>
                <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDeleteEvent(event.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
      {editingEvent && (
        <EventForm
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onSubmit={(updatedEvent) => {
            onUpdateEvent(updatedEvent);
            setEditingEvent(null);
          }}
          initialEvent={editingEvent}
        />
      )}
    </Dialog>
  );
}


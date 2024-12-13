import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event } from '../types/calendar';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Event) => void;
  initialEvent?: Event;
}

export function EventForm({ isOpen, onClose, onSubmit, initialEvent }: EventFormProps) {
  const [event, setEvent] = useState<Event>(
    initialEvent || {
      id: '',
      name: '',
      startTime: '',
      endTime: '',
      description: '',
    }
  );

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
              value={event.startTime}
              onChange={(e) => setEvent({ ...event, startTime: e.target.value })}
              required
            />
            <Input
              type="datetime-local"
              value={event.endTime}
              onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
              required
            />
            <Textarea
              placeholder="Description (optional)"
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">{initialEvent ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


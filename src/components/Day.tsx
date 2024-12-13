// import React from 'react';
import { Day as DayType } from '../types/calendar';
// import { isSameDay } from '../utils/dateUtils';

interface DayProps {
  day: DayType;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function Day({ day, isCurrentMonth, isToday, isSelected, onClick }: DayProps) {
  return (
    <div
      className={`p-2 border ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-100'
      } ${isToday ? 'border-blue-500' : ''} ${
        isSelected ? 'bg-blue-100' : ''
      } cursor-pointer hover:bg-blue-50`}
      onClick={onClick}
    >
      <div className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
        {day.date.getDate()}
      </div>
      {day.events.length > 0 && (
        <div className="mt-1">
          {day.events.slice(0, 2).map((event) => (
            <div key={event.id} className="text-xs truncate">
              {event.name}
            </div>
          ))}
          {day.events.length > 2 && (
            <div className="text-xs text-gray-500">+{day.events.length - 2} more</div>
          )}
        </div>
      )}
    </div>
  );
}


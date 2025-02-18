import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useClassStore } from '../store/classStore';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export function RoutineManagement() {
  const { user } = useAuthStore();
  const { classes, updateClass } = useClassStore();
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );

  const filteredClasses = classes.filter((class_) => {
    const classDate = format(new Date(class_.datetime), 'yyyy-MM-dd');
    return classDate === selectedDate;
  });

  const handleComplete = (classId: string, completed: boolean) => {
    const classToUpdate = classes.find((c) => c.id === classId);
    if (classToUpdate) {
      updateClass({ ...classToUpdate, completed });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="grid gap-6">
            {filteredClasses.map((class_) => (
              <div
                key={class_.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleComplete(class_.id, !class_.completed)}
                    className={`p-2 rounded-full transition-colors ${
                      class_.completed ? 'bg-green-100' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <CheckCircle className={`h-6 w-6 ${
                      class_.completed ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </button>
                  <div>
                    <h3 className="font-semibold text-gray-900">{class_.title}</h3>
                    <p className="text-sm text-gray-500">{class_.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{format(new Date(class_.datetime), 'p')}</span>
                  </div>
                  {user?.role === 'student' && (
                    <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Request Change
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredClasses.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No classes scheduled for this date
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
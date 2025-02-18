import React from 'react';
import { useClassStore } from '../store/classStore';
import { useStudentStore } from '../store/studentStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, DollarSign } from 'lucide-react';

const STUDENT_COLORS = [
  'bg-blue-100 hover:bg-blue-200',
  'bg-purple-100 hover:bg-purple-200',
  'bg-pink-100 hover:bg-pink-200',
  'bg-indigo-100 hover:bg-indigo-200',
  'bg-green-100 hover:bg-green-200',
  'bg-yellow-100 hover:bg-yellow-200',
];

export function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { classes } = useClassStore();
  const { students } = useStudentStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Create a map of student IDs to colors
  const studentColors = React.useMemo(() => {
    const colorMap = new Map();
    students.forEach((student, index) => {
      colorMap.set(student.id, STUDENT_COLORS[index % STUDENT_COLORS.length]);
    });
    return colorMap;
  }, [students]);

  const getClassesForDay = (day: Date) => {
    return classes.filter(class_ => 
      isSameDay(new Date(class_.datetime), day)
    );
  };

  const getPaymentDueForDay = (day: Date) => {
    return students.flatMap(student => 
      student.payments
        .filter(payment => !payment.paid && isSameDay(new Date(payment.dueDate), day))
        .map(payment => ({ studentId: student.id, studentName: student.name }))
    );
  };

  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map(day => {
            const dayClasses = getClassesForDay(day);
            const payments = getPaymentDueForDay(day);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-32 bg-white p-2 ${
                  isCurrentDay ? 'bg-blue-50' : ''
                }`}
              >
                <div className="font-medium text-sm text-gray-500">
                  {format(day, 'd')}
                </div>

                <div className="mt-2 space-y-1">
                  {dayClasses.map(class_ => {
                    const student = students.find(s => s.studentIds?.includes(s.id));
                    const colorClass = student ? studentColors.get(student.id) : 'bg-gray-100';

                    return (
                      <div
                        key={class_.id}
                        className={`${colorClass} p-1 rounded text-xs truncate`}
                        title={`${class_.title} at ${format(new Date(class_.datetime), 'p')}`}
                      >
                        <CalendarIcon className="h-3 w-3 inline-block mr-1" />
                        {format(new Date(class_.datetime), 'p')} - {class_.title}
                      </div>
                    );
                  })}

                  {payments.map(payment => (
                    <div
                      key={payment.studentId}
                      className="bg-red-100 hover:bg-red-200 p-1 rounded text-xs truncate"
                      title={`Payment due for ${payment.studentName}`}
                    >
                      <DollarSign className="h-3 w-3 inline-block mr-1" />
                      Payment - {payment.studentName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {students.map((student, index) => (
            <div key={student.id} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${STUDENT_COLORS[index % STUDENT_COLORS.length]}`} />
              <span className="text-sm">{student.name}</span>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-red-100" />
            <span className="text-sm">Payment Due</span>
          </div>
        </div>
      </div>
    </div>
  );
}
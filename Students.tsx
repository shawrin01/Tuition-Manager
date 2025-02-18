import React, { useState } from 'react';
import { useStudentStore } from '../store/studentStore';
import { useClassStore } from '../store/classStore';
import { Plus, X, GraduationCap, Clock, Calendar, Edit, DollarSign } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CARD_COLORS = [
  'bg-blue-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-indigo-50',
  'bg-green-50',
  'bg-yellow-50',
];

export function Students() {
  const { students, addStudent, updateStudent, markPaymentPaid } = useStudentStore();
  const { addClass } = useClassStore();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    currentClass: '',
    subjects: '',
    schedule: Array(7).fill({ selected: false, time: '' }),
  });

  const handleScheduleChange = (day: number, field: 'selected' | 'time', value: boolean | string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[day] = { ...newSchedule[day], [field]: value };
    setFormData({ ...formData, schedule: newSchedule });
  };

  const generateNextClasses = (studentId: string, schedule: any[], subjects: string[]) => {
    const today = new Date();
    schedule.forEach((day, index) => {
      if (day.selected && day.time) {
        const nextDate = addDays(today, (7 + index - today.getDay()) % 7);
        const [hours, minutes] = day.time.split(':');
        nextDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        subjects.forEach((subject) => {
          addClass({
            id: Math.random().toString(36).substr(2, 9),
            title: `${subject} with ${formData.name}`,
            subject,
            teacherId: 'teacher-id', // Replace with actual teacher ID
            datetime: nextDate.toISOString(),
            duration: 60,
            studentIds: [studentId],
            completed: false,
          });
        });
      }
    });
  };

  const handleEdit = (student: any) => {
    setFormData({
      name: student.name,
      currentClass: student.currentClass,
      subjects: student.subjects.join(', '),
      schedule: student.schedule,
    });
    setEditingStudent(student.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjects = formData.subjects.split(',').map(s => s.trim());

    if (editingStudent) {
      updateStudent(editingStudent, {
        name: formData.name,
        currentClass: formData.currentClass,
        subjects,
        schedule: formData.schedule,
      });
      setEditingStudent(null);
    } else {
      const studentId = Math.random().toString(36).substr(2, 9);
      addStudent({
        id: studentId,
        name: formData.name,
        currentClass: formData.currentClass,
        subjects,
        schedule: formData.schedule,
        completedClasses: 0,
        payments: [],
      });
      generateNextClasses(studentId, formData.schedule, subjects);
    }
    
    setFormData({
      name: '',
      currentClass: '',
      subjects: '',
      schedule: Array(7).fill({ selected: false, time: '' }),
    });
    setShowForm(false);
  };

  const getPaymentStatus = (student: any) => {
    const lastPayment = student.payments[student.payments.length - 1];
    if (!lastPayment) {
      const daysUntilPayment = 12 - (student.completedClasses % 12);
      return {
        type: 'upcoming',
        days: daysUntilPayment,
      };
    }

    if (!lastPayment.paid) {
      const today = new Date();
      const dueDate = new Date(lastPayment.dueDate);
      if (today > dueDate) {
        return {
          type: 'overdue',
          dueDate: format(dueDate, 'PPP'),
        };
      }
      return {
        type: 'upcoming',
        days: differenceInDays(dueDate, today),
      };
    }

    const daysUntilNextPayment = 12 - ((student.completedClasses - student.payments.length * 12) % 12);
    return {
      type: 'upcoming',
      days: daysUntilNextPayment,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Student
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button onClick={() => {
                setShowForm(false);
                setEditingStudent(null);
              }}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current Class</label>
                <input
                  type="text"
                  value={formData.currentClass}
                  onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subjects (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <div className="space-y-2">
                  {DAYS.map((day, index) => (
                    <div key={day} className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={formData.schedule[index].selected}
                        onChange={(e) => handleScheduleChange(index, 'selected', e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="w-24 text-sm">{day}</span>
                      <input
                        type="time"
                        value={formData.schedule[index].time}
                        onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                        disabled={!formData.schedule[index].selected}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={student.id}
            className={`${CARD_COLORS[index % CARD_COLORS.length]} border rounded-lg p-6 transition-transform hover:scale-105`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">Class: {student.currentClass}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setShowPaymentDetails(showPaymentDetails === student.id ? null : student.id)}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full"
                >
                  <DollarSign className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Subjects:</h4>
              <div className="mt-1 flex flex-wrap gap-2">
                {student.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-2 py-1 bg-white bg-opacity-50 rounded-full text-xs font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Schedule:</h4>
              <div className="mt-1 space-y-1">
                {student.schedule.map((day, index) => (
                  day.selected && (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="w-24">{DAYS[index]}</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{day.time}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Classes Completed: {student.completedClasses}
              </span>
            </div>

            {showPaymentDetails === student.id && (
              <div className="mt-4 p-4 bg-white bg-opacity-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                {(() => {
                  const status = getPaymentStatus(student);
                  if (status.type === 'upcoming') {
                    return (
                      <p className="text-sm text-gray-700">
                        Next payment in: {status.days} days
                      </p>
                    );
                  } else {
                    return (
                      <div className="space-y-2">
                        <p className="text-sm text-red-600">
                          Payment overdue since: {status.dueDate}
                        </p>
                        <button
                          onClick={() => markPaymentPaid(student.id, student.payments[student.payments.length - 1].dueDate)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                        >
                          Mark as Paid
                        </button>
                      </div>
                    );
                  }
                })()}
                
                {student.payments.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Payment History</h5>
                    <div className="space-y-2">
                      {student.payments.map((payment, index) => (
                        <div key={index} className="text-sm flex justify-between">
                          <span>{format(new Date(payment.dueDate), 'PP')}</span>
                          <span className={payment.paid ? 'text-green-600' : 'text-red-600'}>
                            {payment.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
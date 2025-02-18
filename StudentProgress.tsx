import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { useClassStore } from '../store/classStore';
import { CheckCircle, TrendingUp, BookOpen } from 'lucide-react';

export function StudentProgress() {
  const { user } = useAuthStore();
  const progress = useProgressStore((state) => 
    state.getStudentProgress(user?.id || '')
  );
  const classes = useClassStore((state) => state.classes);

  const totalClasses = classes.length;
  const attendedClasses = progress.filter((p) => p.attendance).length;
  const averageScore = progress.reduce((acc, p) => acc + p.score, 0) / progress.length || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Classes</p>
              <p className="text-2xl font-semibold text-gray-900">{totalClasses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Classes Attended</p>
              <p className="text-2xl font-semibold text-gray-900">{attendedClasses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900">{averageScore.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Progress History</h2>
          <div className="space-y-4">
            {progress.map((p) => {
              const class_ = classes.find((c) => c.id === p.classId);
              return (
                <div key={`${p.classId}-${p.studentId}`} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{class_?.title}</h3>
                      <p className="text-sm text-gray-500">{class_?.subject}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.attendance
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {p.attendance ? 'Present' : 'Absent'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{p.score}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                  </div>
                  {p.feedback && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Feedback:</span> {p.feedback}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
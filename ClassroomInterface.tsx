import React from 'react';
import { useParams } from 'react-router-dom';
import { useClassStore } from '../store/classStore';
import { useProgressStore } from '../store/progressStore';
import { CheckCircle, XCircle } from 'lucide-react';

export function ClassroomInterface() {
  const { classId } = useParams();
  const class_ = useClassStore((state) => 
    state.classes.find((c) => c.id === classId)
  );
  const progress = useProgressStore((state) => 
    state.getClassProgress(classId || '')
  );

  if (!class_) {
    return <div>Class not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{class_.title}</h1>
        <div className="flex items-center text-gray-500 mb-6">
          <span className="mr-4">{class_.subject}</span>
          <span>Duration: {class_.duration} minutes</span>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Student Progress</h2>
          <div className="space-y-4">
            {progress.map((p) => (
              <div key={p.studentId} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Student ID: {p.studentId}</h3>
                  <p className="text-sm text-gray-500">{p.feedback}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {p.attendance ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span>
                      {p.attendance ? 'Present' : 'Absent'}
                    </span>
                  </div>
                  <div className="w-32">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{p.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
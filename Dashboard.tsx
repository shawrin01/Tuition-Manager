import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { OverviewStats } from '../components/dashboard/OverviewStats';
import { ClassList } from '../components/dashboard/ClassList';
import { AddClassModal } from '../components/dashboard/AddClassModal';
import { Notifications } from '../components/dashboard/Notifications';

export function Dashboard() {
  const { user } = useAuthStore();
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <button
          onClick={() => setIsAddClassModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Class
        </button>
      </div>

      <OverviewStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClassList />
        </div>
        <div>
          <Notifications />
        </div>
      </div>

      <AddClassModal
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
      />
    </div>
  );
}
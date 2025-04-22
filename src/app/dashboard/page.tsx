// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import NavBar from '@/components/ui/NavBar';
import AddTaskForm from '@/components/tasks/AddTaskForm';
import TaskList from '@/components/tasks/TaskList';
import { useAuth } from '@/context/AuthContext';
import { getUserTasks } from '@/lib/taskService';
import { Task } from '@/types/task';

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const fetchedTasks = await getUserTasks(user.uid);
      setTasks(fetchedTasks);
      setError('');
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Dashboard</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AddTaskForm onTaskAdded={fetchTasks} />
            </div>
            
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <TaskList tasks={tasks} onTasksChange={fetchTasks} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
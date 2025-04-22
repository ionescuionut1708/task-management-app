// src/components/tasks/AddTaskForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addTask } from '@/lib/taskService';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

const AddTaskForm = ({ onTaskAdded }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!user) {
      setError('You must be logged in to add tasks');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await addTask({
        title,
        description,
        userId: user.uid
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (err: any) {
      setError(`Failed to add task: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            rows={3}
            placeholder="Enter task description (optional)"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 font-medium"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
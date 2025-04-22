// src/components/tasks/EditTaskForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { updateTask } from '@/lib/taskService';

interface EditTaskFormProps {
  task: Task;
  onCancel: () => void;
  onUpdate: () => void;
}

const EditTaskForm = ({ task, onCancel, onUpdate }: EditTaskFormProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await updateTask(task.id!, {
        title,
        description
      });
      
      onUpdate();
    } catch (err: any) {
      setError(`Failed to update task: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-blue-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Task</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            rows={3}
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 font-medium"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
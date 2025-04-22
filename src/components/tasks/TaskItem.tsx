// src/components/tasks/TaskItem.tsx
'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { toggleTaskCompletion, deleteTask } from '@/lib/taskService';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: () => void;
  onStatusChange: () => void;
}

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await deleteTask(task.id!);
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      await toggleTaskCompletion(task.id!, !task.completed);
      onStatusChange();
    } catch (error) {
      console.error('Error toggling task status:', error);
      alert('Failed to update task status. Please try again.');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className={`p-4 mb-3 border rounded-lg shadow-sm ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleStatus}
            disabled={isToggling}
            className="mt-1 h-5 w-5 text-blue-600 rounded cursor-pointer"
          />
          <div className="ml-3 flex-1">
            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'text-gray-500' : 'text-gray-700'}`}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-600 mt-1">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm px-2 py-1 rounded hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 font-medium text-sm px-2 py-1 rounded hover:bg-gray-100"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
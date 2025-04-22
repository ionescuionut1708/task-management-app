// src/components/tasks/TaskList.tsx
'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import TaskItem from './TaskItem';
import EditTaskForm from './EditTaskForm';

interface TaskListProps {
  tasks: Task[];
  onTasksChange: () => void;
}

const TaskList = ({ tasks, onTasksChange }: TaskListProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdate = () => {
    setEditingTask(null);
    onTasksChange();
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
        <p className="text-gray-700 font-medium">No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdate}
        />
      )}
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Your Tasks</h2>
        <p className="text-sm text-gray-700">You have {tasks.length} task(s) in your list</p>
      </div>
      
      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={onTasksChange}
            onStatusChange={onTasksChange}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
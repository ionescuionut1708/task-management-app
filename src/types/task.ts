// src/types/task.ts
export interface Task {
    id?: string;
    title: string;
    description: string;
    completed?: boolean;
    userId: string;
    createdAt: number;
  }
// src/lib/taskService.ts
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Task } from '@/types/task';

const TASKS_COLLECTION = 'tasks';

export const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<string> => {
  const taskWithTimestamp = {
    ...task,
    createdAt: Date.now(),
    completed: false
  };
  
  const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskWithTimestamp);
  return docRef.id;
};

export const getUserTasks = async (userId: string): Promise<Task[]> => {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Task));
};

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(taskRef, updates);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await deleteDoc(taskRef);
};

export const toggleTaskCompletion = async (taskId: string, completed: boolean): Promise<void> => {
  await updateTask(taskId, { completed });
};
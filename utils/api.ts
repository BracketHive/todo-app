import axios from 'axios';
import type { Task, TaskStatus } from '@/types';

const api = axios.create({
  baseURL: 'https://to-do-ilias.titlos.com'
})

export const fetchTasks = async () => {
  const { data } = await api.get<Task[]>('/todos');
  return data;
};

export const createTask = async (task: Partial<Task>) => {
  const { data } = await api.post<Task>('/todos', task);
  return data;
};

export const deleteTask = async (taskId: number) => {
  await api.delete<string>(`/todos/${taskId}`);
};

export const updateTaskStatus = async (taskId: number, status: TaskStatus) => {
  const { data } = await api.put<Task>(`/todos/${taskId}`, status);
  return data;
};

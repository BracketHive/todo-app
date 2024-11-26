import axios from 'axios';
import type { Task, TaskStatus, ApiResponse, Error } from '@/types';

const api = axios.create({
  baseURL: 'https://to-do-ilias.titlos.com'
})

export const fetchTasks = async (): Promise<ApiResponse<Task, Error>> => {
  try {
    const { data } = await api.get('/todos');
    return { data: data }
  } catch (e) {
    return { error: Object(e) }
  }
};

export const createTask = async (task: Partial<Task>): Promise<ApiResponse<Task, Error>> => {
  try {
    const { data } = await api.post('/todos', task)
    return { data: data }
  } catch (e) {
    return { error: Object(e) }
  }
}

export const deleteTask = async (taskId: number): Promise<ApiResponse<string, Error>> => {
  try {
    const { data } = await api.delete(`/todos/${taskId}`)
    return { data: data }
  } catch (e) {
    return { error: Object(e) }
  }
};

export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<ApiResponse<Task, Error>> => {
  try {
    const { data } = await api.put(`/todos/${taskId}`, status)
    return { data: data }
  } catch (e) {
    return { error: Object(e) }
  }
}

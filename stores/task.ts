import { defineStore } from 'pinia';
import { fetchTasks, createTask, deleteTask, updateTaskStatus } from '@/utils/api';
import type { Category, Task } from '@/types';

export interface TaskState {
  tasks: Task[]
}

export type TaskGetters = {
  loadTasks: (state: TaskState) => Task[]
  tasksByCategory: (state: TaskState) => (category: Category) => Task[]
}

export type TaskActions = {
  fetchTasks: () => void
  addTask: (newTask: Partial<Task>) => void
  removeTask: (taskId: number) => void
  toggleTaskStatus: (taskId: number) => void
}

export const useTasksStore = defineStore<string, TaskState, TaskGetters, TaskActions>('tasks', {
  state: () => ({
    tasks: [],
  }),

  getters: {
    loadTasks: (state: TaskState) => {
      return state.tasks
    },

    tasksByCategory: (state: TaskState) => (category: Category) => {
      return state.tasks.filter((task: Task) => task.category === category)
    }
  },

  actions: {
    async fetchTasks() {
      this.tasks = await fetchTasks();
    },
    async addTask(newTask: Partial<Task>) {
      const task = await createTask(newTask);
      this.tasks.push(task);

      this.fetchTasks()
    },
    async removeTask(taskId: number) {
      await deleteTask(taskId);
      this.tasks = this.tasks.filter((task) => task.id !== taskId);

      this.fetchTasks()
    },
    async toggleTaskStatus(taskId: number) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        await updateTaskStatus(taskId, { completed: !task.completed });
      }

      this.fetchTasks()
    },
  },
});


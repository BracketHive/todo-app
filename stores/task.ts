import { defineStore } from 'pinia';
import { fetchTasks, createTask, deleteTask, updateTaskStatus } from '@/utils/api';
import type { Category, Task } from '@/types';

export interface TaskState {
  tasks: Task[]
  category: Category
}

export type TaskGetters = {
  loadTasks: (state: TaskState) => Task[]
  setCategory: (state: TaskState) => (category: Category) => void
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
    category: 'All',
  }),

  getters: {
    loadTasks: (state: TaskState) => {
      if (state.category === 'All') return state.tasks
      return state.tasks.filter((task: Task) => task.category === state.category)
    },

    setCategory: (state: TaskState) => (category: Category) => {
      state.category = category
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


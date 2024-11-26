import { defineStore } from 'pinia';
import { fetchTasks, createTask, deleteTask, updateTaskStatus } from '@/utils/api';
import type { Category, Task, Error } from '@/types';

export interface TaskState {
  tasks: Task[]
  category: Category
}

export type TaskGetters = {
  loadTasks: (state: TaskState) => Task[]
  setCategory: (state: TaskState) => (category: Category) => void
}

export type TaskActions = {
  fetchTasks: () => Promise<Task|Error|undefined>
  addTask: (newTask: Partial<Task>) => Promise<Task|Error|undefined>
  removeTask: (taskId: number) =>  Promise<string|Error|undefined>
  toggleTaskStatus: (taskId: number) => Promise<Task|Error|undefined>
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
      const { data, error } = await fetchTasks();

      if (data) this.tasks = data
      if (error) return error
    },
    async addTask(newTask: Partial<Task>) {
      const { data, error } = await createTask(newTask);

      if (data) {
        this.fetchTasks()
        return data
      }

      if (error) return error
    },
    async removeTask(taskId: number) {
      const { data, error } = await deleteTask(taskId);

      if (data) {
        this.fetchTasks()
        return data
      }

      if (error) return error
    },
    async toggleTaskStatus(taskId: number) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        const { data, error } = await updateTaskStatus(taskId, { completed: !task.completed });

        if (data) {
          this.fetchTasks()
          return data
        }

        if (error) return error
      }
    },
  },

  persist: {
    pick: ['category'],
  },
});


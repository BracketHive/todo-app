import type { Category } from "./category"

export interface Task {
  id: number
  title: string
  category: Category
  completed: boolean
}

export interface TaskStatus {
  completed: boolean
}

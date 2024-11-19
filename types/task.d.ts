export interface Task {
  id: number
  title: string
  category: 'work' | 'personal' | 'home'
  completed: boolean
}

export interface TaskStatus {
  completed: boolean
}

import { Todo } from '../types'

const STORAGE_KEY = 'todos'

export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

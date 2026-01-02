import { useEffect, useState } from 'react'
import { Todo } from './types'
import { loadTodos, saveTodos } from './utils/storage'
import TodoItem from './components/TodoItem'
import { v4 as uuidv4 } from 'uuid'

type Filter = 'all' | 'active' | 'completed'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    setTodos(loadTodos())
  }, [])

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = () => {
    if (!text.trim()) return
    setTodos([{ id: uuidv4(), text, completed: false }, ...todos])
    setText('')
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  )

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center text-primary">Todo List</h1>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          className="flex-1 p-3 rounded bg-surface text-white placeholder:text-textSecondary outline-none"
        />
        <button
          onClick={addTodo}
          className="bg-primary text-white px-4 py-2 rounded hover:brightness-110 transition"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center gap-4 text-sm text-textSecondary">
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={f === filter ? 'text-white underline' : ''}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-textSecondary">No todos</p>
        ) : (
          filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

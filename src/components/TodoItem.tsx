import { Todo } from '../types'
import { clsx } from 'clsx'

interface Props {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded shadow-sm transition-all hover:scale-[1.01]">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-5 h-5 accent-primary"
        />
        <span
          className={clsx('text-lg', {
            'line-through text-textSecondary': todo.completed
          })}
        >
          {todo.text}
        </span>
      </label>
      <button
        onClick={onDelete}
        className="text-error hover:text-white transition-colors"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </div>
  )
}

import { type FC, useState } from 'react'
import { api } from '../utils/api'

type TodoProps = {
    title: string
    description: string | null
    completed: boolean
    id: string
    deleteMe: (id: string) => void
}

const Todo: FC<TodoProps> = ({
    title,
    description,
    completed,
    id,
    deleteMe
}) => {
    const [isCompleted, setCompleted] = useState(completed)
    const updateTodo = api.todo.updateTodo.useMutation()

    const update = () => {
        updateTodo.mutate({
            completed: !isCompleted,
            id,
            title
        })
    }

    const handleChange = () => {
        setCompleted(!isCompleted)
        update()
    }

    return (
        <div
            className={
                'flex min-w-[300px] flex-col gap-1 rounded-lg bg-purple-800 p-4' +
                (isCompleted ? ' opacity-50' : '')
            }
        >
            <div className="flex items-baseline justify-between gap-2">
                <h2>{title}</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="completed"
                        checked={isCompleted}
                        onChange={handleChange}
                    />
                    <button onClick={() => deleteMe(id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {description && (
                <span className="border-t-2 border-purple-500 pt-1 text-sm">
                    {description}
                </span>
            )}
        </div>
    )
}

export default Todo

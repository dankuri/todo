import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Input from '../components/Input'
import Todo from '../components/Todo'

import { api } from '../utils/api'

const Home: NextPage = () => {
    const [newTitle, setNewTitle] = useState('')
    const [newDescr, setNewDescr] = useState('')

    // TODO: add zod validation for newTitle & newDescr

    const todos = api.todo.getAll.useQuery()
    const trpc = api.useContext()

    const createTodoMutation = api.todo.createTodo.useMutation({
        onSettled() {
            trpc.todo.invalidate()
        }
    })

    const createTodo = () => {
        createTodoMutation.mutate({
            title: newTitle,
            description: newDescr
        })
        setNewTitle('')
        setNewDescr('')
    }

    const deleteTodoMutation = api.todo.deleteTodo.useMutation({
        onSettled() {
            trpc.todo.invalidate()
        }
    })

    const deleteTodo = (id: string) => {
        deleteTodoMutation.mutate({
            id
        })
    }

    return (
        <>
            <Head>
                <title>sakuri todo</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-5 px-4 py-16 ">
                    <h1 className="text-[5rem] font-extrabold tracking-tight text-white">
                        Todos
                    </h1>
                    <form
                        onSubmit={ev => {
                            ev.preventDefault()
                            createTodo()
                        }}
                        className="flex flex-col items-center gap-2"
                    >
                        <Input
                            placeholder="title"
                            onChange={setNewTitle}
                            value={newTitle}
                        />
                        <Input
                            placeholder="descr"
                            onChange={setNewDescr}
                            value={newDescr}
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-purple-300 p-2 px-8 font-bold"
                        >
                            submit
                        </button>
                    </form>
                    <div className="flex flex-col gap-4 text-2xl text-white">
                        {todos.data
                            ? todos.data.map(todo => {
                                  return (
                                      <Todo
                                          id={todo.id}
                                          title={todo.title}
                                          completed={todo.completed}
                                          description={todo.description}
                                          deleteMe={deleteTodo}
                                          key={todo.id}
                                      />
                                  )
                              })
                            : 'Loading your todos...'}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home
import { useState } from "react"
import { useMutation } from "@apollo/client"

import Button from "../Button1"
import { addTodoM, getTodosQ } from "../../gql/queries"

import { useAuthContext } from '../../context/auth'

import Input from '../Input2'


const TodoForm = () => {

    const [todo, setTodo] = useState({ name: '', uid: auth })

    const [auth, setAuth] = useAuthContext()

    const [addTodo, status] = useMutation(addTodoM, { refetchQueries: [{ query: getTodosQ }, 'GetTodos'] })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        todo.uid = auth
        addTodo({ variables: todo })
        setTodo({ ...todo, name: '' })
    }

    return (
        <form onSubmit={handleSubmit} className='form-group'>
            <Input
                label="Todo"
                type="text"
                value={todo.name}
                onChange={e => setTodo({ ...todo, name: e.target.value })}
            />

            <i className="input-icon uil uil-plus"></i>

        </form>
    )
}

export default TodoForm
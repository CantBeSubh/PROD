import { useState } from "react"
import { useMutation } from "@apollo/client"

import { addTodoM,getTodosQ } from "../../gql/queries"

import { useAuthContext } from '../../context/auth'

const TodoForm = () => {

    const [todo,setTodo]=useState({name:'',uid:auth})

    const [auth,setAuth]=useAuthContext()

    const [addTodo,status]=useMutation(addTodoM,{refetchQueries:[{query:getTodosQ},'GetTodos']})

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        todo.uid=auth
        addTodo({variables:todo})
        setTodo({...todo,name:''})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                label="Todo"
                type="text"
                name="todo"
                value={todo.name}
                onChange={e=>setTodo({...todo,name:e.target.value})}
            />

            <button type="submit">+</button>
        </form>
    )
}

export default TodoForm
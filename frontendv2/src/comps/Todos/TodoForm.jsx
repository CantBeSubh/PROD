import { useState } from "react"
import { useMutation } from "@apollo/client"
import { addTodoM,getTodosQ } from "../../queries"

const TodoForm = () => {
    const [todo,setTodo]=useState({
        name:'',
        uid:'629b6eba01c01cd9b7d7dc7d'
    })

    const [addTodo,status]=useMutation(addTodoM,{refetchQueries:[{query:getTodosQ}]})

    const handleSubmit=(e)=>{
        if (status.loading) return 'Submitting...'
        if (status.error) return `Submission error! ${status.error.message}`
        e.preventDefault()
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
import { useMutation } from "@apollo/client"
import { delTodoM, getTodosQ,updateTodoM } from "../../gql/queries"

const Todo = ({todo}) => {
  const [delTodo,status]=useMutation(delTodoM,{refetchQueries:[{query:getTodosQ},'GetTodos']})
  const [updateTodo,status2]=useMutation(updateTodoM,{refetchQueries:[{query:getTodosQ},'GetTodos']})

  const handleComplete=()=>{
    if (status2.loading) return 'Submitting...'
    if (status2.error) return `Submission error! ${status.error.message}`
    updateTodo({variables:{
      ...todo,
      check:!todo.check
    }})
  }
  const handleDel=()=>{
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    delTodo({variables:{id:todo.id}})
  }
  
  return (
      <li>
        {todo.name} 
        <input type='checkbox' checked={todo.check} onChange={handleComplete} /> 
        <button onClick={handleDel}> X </button>
      </li>
  )
}

export default Todo
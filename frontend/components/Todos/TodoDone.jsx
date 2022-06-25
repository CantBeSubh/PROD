import { useMutation } from "@apollo/client"

import Button from "../Button2"
import { delTodoM, getTodosQ, updateTodoM } from "../../gql/queries"

const TodoDone = ({ todo, show }) => {

  const [delTodo, status] = useMutation(delTodoM, { refetchQueries: [{ query: getTodosQ }, 'GetTodos'] })

  const [updateTodo, status2] = useMutation(updateTodoM, { refetchQueries: [{ query: getTodosQ }, 'GetTodos'] })

  const handleComplete = () => {
    if (status2.loading) return 'Submitting...'
    if (status2.error) return `Submission error! ${status.error.message}`
    updateTodo({
      variables: {
        ...todo,
        check: !todo.check
      }
    })
  }
  const handleDel = () => {
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    delTodo({ variables: { id: todo.id } })
  }
  if (!show) {
    return (
      <li>
        <a onClick={handleComplete}> {todo.name} </a>
        <span onClick={handleDel}> X </span>
      </li>
    )
  }
}

export default TodoDone
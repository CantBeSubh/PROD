import TodoDue from "./TodoDue"
import TodoDone from "./TodoDone"
import { useState } from "react"
const TodoList = ({ todos }) => {
  const [show, setShow] = useState(true)
  const [opt1, setOpt1] = useState('')
  const [opt2, setOpt2] = useState('')
  return (
    <>
      <input
        className="todo-icon"
        type="checkbox"
        id="todo-icon"
        name="todo-icon"
      />
      <label htmlFor="todo-icon" />
      <div className="todo">

        <ul className="pt-5">
          <div
            className={`btn ${opt1}`}
            onClick={() => {
              setShow(true);
              setOpt1('me')
              setOpt2('')
            }}>Due
          </div>
          <div
            className={`btn ${opt2}`}
            onClick={() => {
              setShow(false)
              setOpt2('me')
              setOpt1('')
            }}>Done
          </div>
          {
            todos.map(todo => {
              if (todo.check) {
                return <TodoDue
                  key={todo.id}
                  todo={todo}
                  show={show}
                />
              } else {
                return <TodoDone
                  key={todo.id}
                  todo={todo}
                  show={show}
                />
              }
            }
            )
          }
        </ul>
      </div>
    </>
  )
}

export default TodoList
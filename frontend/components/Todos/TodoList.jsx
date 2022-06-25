import TodoDue from "./TodoDue"
import TodoDone from "./TodoDone"
import { useState } from "react"

import { useOptionsContext } from '../../context/option'

const TodoList = ({ todos }) => {
  const [options, setOptions] = useOptionsContext()
  const [show, setShow] = useState(true)
  const [opt1, setOpt1] = useState('me')
  const [opt2, setOpt2] = useState('')

  return (
    <>
      <input
        className="todo-icon"
        type="checkbox"
        id="todo-icon"
        name="todo-icon"
        checked={options.optionT}
        onClick={e => {
          setOptions({
            optionD: false,
            optionH: false,
            optionT: !options.optionT
          })
        }}
      />
      <label htmlFor="todo-icon" />
      <span className='tooltipT'>
        Todos
      </span>
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
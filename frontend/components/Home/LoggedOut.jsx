import HabitForm from '../Habits/HabitForm.jsx'
import HabitList from '../Habits/HabitList'
import TodoForm from '../Todos/TodoForm'
import TodoList from '../Todos/TodoList'

import styles from '../../styles/Home.module.css'

const Logout = ({habits,todos}) => {
  return (
    <div className={styles.formContainer}>
      <div>
        Habit: <HabitForm />
        <HabitList habits={habits} />
      </div>
      <div>
        Todo: <TodoForm />
        <TodoList todos={todos}/>
      </div>
    </div>
  )
}

export default Logout
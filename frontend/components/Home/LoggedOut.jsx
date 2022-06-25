import HabitForm from '../Habits/HabitForm.jsx'
import HabitList from '../Habits/HabitList'
import TodoForm from '../Todos/TodoForm'
import TodoList from '../Todos/TodoList'
import DailyForm from '../Daily/DailyForm'
import DailyList from '../Daily/DailyList'

import styles from '../../styles/Home.module.css'

const Logout = ({ habits, todos, dailies }) => {
  return (
    <div className={styles.formContainer}>
      <div>
        <HabitForm />
        <HabitList habits={habits} />
      </div>
      <br />
      <div>
        <DailyForm />
        <DailyList dailies={dailies} />
      </div>
      <br />
      <div>
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default Logout
import HabitForm from './Habits/HabitForm.jsx'
import HabitList from './Habits/HabitList'
import TodoForm from './Todos/TodoForm'
import TodoList from './Todos/TodoList'

const Logout = ({habits,todos}) => {
  return (
    <>
      Habit: <HabitForm />
      Todo: <TodoForm />
      <HabitList habits={habits} />
      <TodoList todos={todos}/>
    </>
  )
}

export default Logout
import HabitForm from '../Habits/HabitForm.jsx'
import HabitList from '../Habits/HabitList'
import TodoForm from '../Todos/TodoForm'
import TodoList from '../Todos/TodoList'
import DailyForm from '../Daily/DailyForm'
import DailyList from '../Daily/DailyList'
import Image from 'next/image'

import styles from '../../styles/Home.module.css'

const Logout = ({ habits, todos, dailies }) => {
  return (
    <div className={styles.Container}>
      <div className={StyleSheet.formContainer}>
        <HabitForm />
        <br />
        <DailyForm />
        <br />
        <TodoForm />
      </div>
      <div className={styles.image}>
        <Image src='/Pixel.png'
          width={540}
          height={540}
          alt='logo' />
      </div>
      <HabitList habits={habits} />
      <DailyList dailies={dailies} />
      <TodoList todos={todos} />
    </div>
  )
}

export default Logout
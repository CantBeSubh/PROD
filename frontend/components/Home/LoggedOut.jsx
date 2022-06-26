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
      <div className={styles.formContainer}>
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
        <br />
        <br />
        {/* <iframe
          src="https://mmontag.github.io/chip-player-js/"
          width='900rem'
          height='500rem'
        /> */}
      </div>
      <div>
        <HabitList habits={habits} />
        <DailyList dailies={dailies} />
        <TodoList todos={todos} />
      </div>
    </div>
  )
}

export default Logout
import { useMutation } from "@apollo/client"

import {
  delHabitM,
  getHabitsQ,
  updateHabitM
} from "../../gql/queries"

const Habit = ({ habit }) => {

  const [delHabit, status] = useMutation(delHabitM,
    { refetchQueries: [{ query: getHabitsQ }, 'GetHabits'] })

  const [updateHabit, status2] = useMutation(updateHabitM,
    { refetchQueries: [{ query: getHabitsQ }, 'GetHabits'] })

  const handleUp = () => {
    if (status2.loading) return 'Submitting...'
    if (status2.error) return `Submission error! ${status.error.message}`
    updateHabit({
      variables: {
        ...habit,
        up: habit.up + 1
      }
    })
  }

  const handleDown = () => {
    if (status2.loading) return 'Submitting...'
    if (status2.error) return `Submission error! ${status.error.message}`
    updateHabit({
      variables: {
        ...habit,
        down: habit.down + 1
      }
    })
  }

  const handleDel = () => {
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    delHabit({ variables: { id: habit.id } })
  }

  return (
    <li>
      <span>
        <i className="uil uil-arrow-up" onClick={handleUp} />
        <span>{habit.up} </span>
      </span>
      <a onClick={handleDel}> {habit.name} </a>
      <span>
        <span> -{habit.down}</span>
        <i className="uil uil-arrow-down" onClick={handleDown} />
      </span>
    </li>
  )
}

export default Habit
import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { addHabitM, getHabitsQ } from '../../gql/queries'

import { useAuthContext } from '../../context/auth'

import Input from '../Input2'

const HabitForm = () => {

  const [auth] = useAuthContext()

  const [habit, setHabit] = useState({ name: '', uid: auth })

  const [addHabit, status] = useMutation(addHabitM, {
    refetchQueries: [{ query: getHabitsQ }, 'GetHabits']
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    habit.uid = auth
    addHabit({ variables: habit })
    setHabit({ ...habit, name: '' })
  }

  return (
    <form onSubmit={handleSubmit} className='form-group'>
      <Input
        label="Habit"
        type="text"
        value={habit.name}
        onChange={(e) => setHabit({ ...habit, name: e.target.value })}
      />

      <i className="input-icon uil uil-plus"></i>
    </form>
  )
}

export default HabitForm
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { addHabitM, getHabitsQ } from '../../gql/queries'

const HabitForm = ({uid}) => {
  const [habit,setHabit]=useState({name:'',uid:''})
  const [addHabit,status]=useMutation(addHabitM,{refetchQueries:[
    {query:getHabitsQ},
    'GetHabits'
  ]})

  const handleSubmit=(e)=>{
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    e.preventDefault()
    habit.uid=uid
    addHabit({variables:habit})
    setHabit({...habit,name:''})
  }

  return (
    <form onSubmit={handleSubmit} >
      <input
        label="Habit"
        type="text"
        name="habit"
        value={habit.name}
        onChange={(e)=>setHabit({...habit,name:e.target.value})}
      />

      <button type='submit'>+</button>
    </form>
  )
}

export default HabitForm
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { addHabitM, getHabitsQ } from '../queries'

const HabitForm = () => {
  const [habit,setHabit]=useState({
    uid:'629b6eba01c01cd9b7d7dc7d',
    name:''
  })
  const [addHabit,status]=useMutation(addHabitM,{refetchQueries:[{query:getHabitsQ}]})

  const handleSubmit=(e)=>{
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    e.preventDefault()
    addHabit({variables:{name:habit.name,uid:habit.uid}})
    setHabit({...habit,name:''})
  }

  return (
    <form onSubmit={handleSubmit} >
      <input
        label="Habit"
        type="text"
        name="habit"
        value={habit.name}
        onChange={(e)=>setHabit(old=>({...old,name:e.target.value}))}
      />

      <button type='submit'>+</button>
    </form>
  )
}

export default HabitForm
import { useState } from 'react'
// import { useMutation } from '@apollo/client'
// import {client} from '../gql/apollo-client'
// import {v4} from 'uuid'
// import { addHabitM,getHabitsQ } from '../gql/queries'

const HabitForm = () => {
  const [habit,setHabit]=useState({
    name:'',
    up:0,
    down:0
  })
  // const [addHabit, status]=client.mutate(addHabitM,{refetchQueries:[getHabitsQ]})

  const handleInput=(e)=>{
    setHabit({...habit,name:e.target.value})
  }

  const handleSubmit=(e)=>{
    // if (status.loading) return 'Submitting...'
    // if (status.error) return `Submission error! ${status.error.message}`
    e.preventDefault()
    if(habit.name.trim()){
      addHabit({variables:habit})
      setHabit({name:'',up:0,down:0})}
  }

  return (
    <form onSubmit={handleSubmit} >
      <input
        label="Habit"
        type="text"
        name="habit"
        value={habit.name}
        onChange={handleInput}
      />

      <button type='submit'>+</button>
    </form>
  )
}

export default HabitForm
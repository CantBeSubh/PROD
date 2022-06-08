import { useState } from 'react'
import {v4} from 'uuid'

const HabitForm = ({addHabit}) => {

  const [habit,setHabit]=useState({
    name:'',
    up:0,
    down:0
  })

  const handleInput=(e)=>{
    setHabit({...habit,name:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(habit.name.trim()){
      addHabit({...habit,id:v4()})
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
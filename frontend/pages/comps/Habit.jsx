const Habit = ({habit,upHabit,downHabit,removeHabit}) => {
  const handleUp=(id)=>{
    upHabit(id)
  }
  
  return (
      <li>
        {habit.name} | {habit.up} | -{habit.down} 
        <button onClick={()=>handleUp(habit.id)}> + </button>
        <button onClick={()=>downHabit(habit.id)}> - </button>
        <button onClick={()=>removeHabit(habit.id)}> X </button>
      </li>
  )
}

export default Habit
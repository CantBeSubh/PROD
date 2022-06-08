const Habit = ({habit,upHabit,downHabit}) => {
  return (
      <li>
        {habit.name} | {habit.up} | {habit.down} 
        <button onChange={()=>upHabit(habit.id)}> + </button>
        <button onChange={()=>downHabit(habit.id)}> - </button>
      </li>
  )
}

export default Habit
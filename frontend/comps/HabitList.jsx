import Habit from "./Habit"

const HabitList = ({habits,upHabit,downHabit,removeHabit}) => {
  return (
    <ul>
      {habits.map(habit=>
        <Habit
        key={habit.id}
        habit={habit}
        upHabit={upHabit}
        downHabit={downHabit}
        removeHabit={removeHabit}
        />      
        )}
    </ul>
  )
}

export default HabitList
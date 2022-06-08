import Habit from "./Habit"

const HabitList = ({habits,upHabit,downHabit}) => {
  return (
    <ul>
      {habits.map(habit=>
        <Habit
        key={habit.id}
        habit={habit}
        upHabit={upHabit}
        downHabit={downHabit}
        />      
        )}
    </ul>
  )
}

export default HabitList
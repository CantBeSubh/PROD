import Habit from "./Habit"

const HabitList = ({habits}) => {
  return (
    <ul>
      {
        habits.map(habit=>
          <Habit
            key={habit.id}
            habit={habit}
          />      
        )
      }
    </ul>
  )
}

export default HabitList
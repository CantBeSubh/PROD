import Habit from "./Habit"

const HabitList = ({ habits }) => {
  return (
    <>
      <input
        className="habit-icon"
        type="checkbox"
        id="habit-icon"
        name="habit-icon"
      />
      <label htmlFor="habit-icon" />
      <div className="habit">
        <ul className="pt-5">
          {
            habits.map(habit =>
              <Habit
                key={habit.id}
                habit={habit}
              />
            )
          }
        </ul>
      </div>
    </>
  )
}

export default HabitList
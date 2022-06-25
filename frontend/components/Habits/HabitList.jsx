import Habit from "./Habit"

const HabitList = ({ habits }) => {
  return (
    <>
      <input
        className="menu-icon"
        type="checkbox"
        id="menu-icon"
        name="menu-icon"
      />
      <label htmlFor="menu-icon" />
      <div className="nav">
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
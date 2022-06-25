import Habit from "./Habit"
import { useOptionsContext } from '../../context/option'


const HabitList = ({ habits }) => {
  const [options, setOptions] = useOptionsContext()

  return (
    <>
      <input
        className="habit-icon"
        type="checkbox"
        id="habit-icon"
        name="habit-icon"
        checked={options.optionH}
        onClick={e => {
          setOptions({
            optionD: false,
            optionT: false,
            optionH: !options.optionH
          })
        }}
      />
      <label htmlFor="habit-icon" />
      <span className='tooltipH'>
        Habits
      </span>
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
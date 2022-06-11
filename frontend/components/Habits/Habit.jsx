import { useMutation } from "@apollo/client"
import { delHabitM, getHabitsQ,updateHabitM } from "../../gql/queries"
const Habit = ({habit}) => {
  const [delHabit,status]=useMutation(delHabitM,{refetchQueries:[{query:getHabitsQ}]})
  const [updateHabit,status2]=useMutation(updateHabitM,{refetchQueries:[{query:getHabitsQ}]})

  const handleUp=()=>{
    if (status2.loading) return 'Submitting...'
    if (status2.error) return `Submission error! ${status.error.message}`
    updateHabit({variables:{
      ...habit,
      up:habit.up+1
    }})
  }

  const handleDown=()=>{
    if (status2.loading) return 'Submitting...'
    if (status2.error) return `Submission error! ${status.error.message}`
    updateHabit({variables:{
      ...habit,
      down:habit.down+1
    }})
  }

  const handleDel=()=>{
    if (status.loading) return 'Submitting...'
    if (status.error) return `Submission error! ${status.error.message}`
    delHabit({variables:{id:habit.id}})
  }
  
  return (
      <li>
        {habit.name} | {habit.up} | -{habit.down} 
        <button onClick={handleUp}> + </button>
        <button onClick={handleDown}> - </button>
        <button onClick={handleDel}> X </button>
      </li>
  )
}

export default Habit
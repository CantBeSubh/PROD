import {useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'

import './App.css';

import HabitForm from './comps/HabitForm'
import HabitList from './comps/HabitList'

import {getHabitsQ} from './queries'

// const LOCAL_STORAGE_KEY='prod-habits'

function App() {
  const [habits, setHabits] = useState([]);
  const { data } = useQuery(getHabitsQ);

  const upHabit=(id)=>{
    setHabits(
      habits.map(habit => {
        if (habit.id === id) {
          return {
            ...habit,
            up: habit.up+1
          };
        }
        return habit;
      })
    );
  }

  const downHabit=(id)=>{
    setHabits(
      habits.map(habit => {
        if (habit.id === id) {
          return {
            ...habit,
            down: habit.down+1
          };
        }
        return habit;
      })
    );
  }

  const removeHabit=(id)=> {
    setHabits(habits.filter(habit => habit.id !== id));
  }
  
  useEffect(()=>{
    if(data){
      setHabits(data.habits)
    }
  },[data])



  return (
    <div className="App">
      <HabitForm />
      <HabitList 
      habits={habits} 
      upHabit={upHabit}
      downHabit={downHabit}
      removeHabit={removeHabit}
      />
    </div>
  );
}

export default App;

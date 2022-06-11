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
      />
    </div>
  );
}

export default App;

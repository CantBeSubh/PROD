import {useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'

import './App.css';

import HabitForm from './comps/Habits/HabitForm'
import HabitList from './comps/Habits/HabitList'
import TodoForm from './comps/Todos/TodoForm'
import TodoList from './comps/Todos/TodoList'

import {getHabitsQ,getTodosQ} from './queries'

// const LOCAL_STORAGE_KEY='prod-habits'

function App() {
  const [habits, setHabits] = useState([])
  const [todos,setTodos]=useState([])
  const getHabits = useQuery(getHabitsQ)
  const getTodos = useQuery(getTodosQ)

  useEffect(()=>{
    if(getHabits.data){
      setHabits(getHabits.data.habits)
    }
    if(getTodos.data){
      setTodos(getTodos.data.todos)
    }
  },[getHabits,getTodos])

  return (
    <div className="App">
      <HabitForm />
      <TodoForm/>
      <HabitList habits={habits} />
      <TodoList todos={todos}/>
    </div>
  );
}

export default App;

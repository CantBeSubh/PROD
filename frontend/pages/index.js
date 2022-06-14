import {useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'
import Head from 'next/head'

import HabitForm from '../components/Habits/HabitForm.jsx'
import HabitList from '../components/Habits/HabitList'
import TodoForm from '../components/Todos/TodoForm'
import TodoList from '../components/Todos/TodoList'

import {getHabitsQ,getTodosQ} from '../gql/queries'

import { useAuthContext } from '../context/auth';

function App() {

  const [auth,setAuth]=useAuthContext()

  const [habits, setHabits] = useState([])
  const [todos,setTodos]=useState([])

  const getHabits = useQuery(getHabitsQ,{variables:{uid:auth}})
  const getTodos = useQuery(getTodosQ,{variables:{uid:auth}})

  useEffect(()=>{
    if(getHabits.data) setHabits(getHabits.data.habits);
    if(getTodos.data) setTodos(getTodos.data.todos);
  },[getHabits,getTodos])

  return (
    <>
      <Head>
        <title>PROD</title>
      </Head>
      <div className="App">
        {auth && 
          <>
            Habit: <HabitForm />
            Todo: <TodoForm />
            <HabitList habits={habits} />
            <TodoList todos={todos}/>
          </>
        }
      </div>
    </>
  )
}

export default App;
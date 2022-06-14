import {useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'
import Head from 'next/head'

import Logout from '../components/LoggedOut'
import Login from '../components/LoggedIn'

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
        {auth?<Logout habits={habits} todos={todos}/>:<Login/>}
      </div>
    </>
  )
}

export default App;
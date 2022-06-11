import { useQuery } from "@apollo/client"
import { useState } from "react"
import { loginQ } from "../../gql/queries"

const index = () => {
    const [state,setState]=useState({email:'',password:''})
    const {loading,error,data}=useQuery(loginQ,{variables:state})

    const handleSubmit=e=>{
        if (loading) return;
        if (error) return;

        e.preventDefault()
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
            label='email' 
            type='email' 
            placeholder='email'
            value={state.email}
            onChange={e=>setState({...state,email:e.target.value})}
            />
            <input 
            label='password' 
            type='password' 
            placeholder='password'
            value={state.password}
            onChange={e=>setState({...state,password:e.target.value})}
            />
            <button type='submit'>Login</button>
        </form>
  )
}

export default index
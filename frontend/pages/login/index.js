import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useRouter } from 'next/router';
import { loginQ } from "../../gql/queries"

const index = () => {
    const [state,setState]=useState({email:'',password:''})
    const {loading,error,data}=useQuery(loginQ,{variables:state})
    const router = useRouter()
    const handleSubmit=e=>{
        if (loading) return <p>LOADING...</p>;
        if (error) return <p>ERROR</p>;

        e.preventDefault()
        const {id,token,status}=data.login
        if(status==='Found'){
            localStorage.setItem('id',id)
            localStorage.setItem('jwt',token)
        }
        setTimeout(()=>router.push('/'),100)
        
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
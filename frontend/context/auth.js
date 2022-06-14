import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext()

export function AuthProvider({ children }) {
    let uid=''
    useEffect(()=>{
        uid=(localStorage.getItem('id'))
    },[])

    const [auth, setAuth] = useState(uid)

    useEffect(()=>{
        setAuth(uid)
    },[uid])
    
    return (
      <Context.Provider value={[auth, setAuth]}>{children}</Context.Provider>
    )
}

export function useAuthContext() {
    return useContext(Context);
}
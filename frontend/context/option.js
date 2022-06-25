import { createContext, useContext, useState } from "react"

const Context = createContext()

export function OptionsProvider({ children }) {
    const [options, setOptions] = useState({
        optionD: false,
        optionH: false,
        optionT: false
    })
    return (
        <Context.Provider value={[options, setOptions]}>{children}</Context.Provider>
    )
}

export function useOptionsContext() {
    return useContext(Context);
}
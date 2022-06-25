import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
const Input = ({
    type,
    label,
    value,
    onChange
}) => {
    const [id, setId] = useState()

    useEffect(() => {
        setId(v4())
    }, [])
    return (
        <input
            spellCheck='off'
            autoComplete='off'
            className="form-style2"
            type={type}
            placeholder={label}
            name={label}
            id={id}
            value={value}
            onChange={onChange}
            required
        />
    )
}

export default Input
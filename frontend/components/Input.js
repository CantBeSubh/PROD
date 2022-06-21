import styles from '../styles/Comps.module.css'
import { v4 } from 'uuid'
const Input = ({
    type,
    label,
    value,
    onChange
}) => {
    const id = v4()
    return (
        <input
            spellCheck='off'
            autoComplete='off'
            className="form-style"
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
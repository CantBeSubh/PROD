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
        <div className={styles.form__group}>
            <input
                spellCheck='off'
                autoComplete='off'
                className={styles.form__field}
                type={type}
                placeholder={label}
                name={label}
                id={id}
                value={value}
                onChange={onChange}
                required
            />
            <label htmlFor={id} className={styles.form__label}>{label}</label>
        </div>
    )
}

export default Input
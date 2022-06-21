import styles from '../styles/Comps.module.css'
const Input = ({
    type,
    label,
    value,
    onChange
}) => {
    return (
        <div className={styles.form__group}>
            <input
                autoComplete='off'
                className={styles.form__field}
                type={type}
                placeholder={label}
                name={label}
                // id={() => v4.toString()}
                value={value}
                onChange={onChange}
                required
            />
            <label htmlFor="name" className={styles.form__label}>{label}</label>
        </div>
    )
}

export default Input
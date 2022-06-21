import styles from '../styles/Comps.module.css'
const Button = ({ onClick, type, children }) => {
    return (
        <button
            className={styles.btnT}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
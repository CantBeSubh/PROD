import styles from '../styles/Comps.module.css'
const Button = ({ onClick, type, children }) => {
    return (
        <button
            className={styles.btnS}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
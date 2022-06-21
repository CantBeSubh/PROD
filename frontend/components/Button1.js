import styles from '../styles/Comps.module.css'
const Button = ({ onClick, type, children }) => {
    return (
        <button
            className={styles.btnP}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
import Link from 'next/link'
import Image from 'next/image'

import { useAuthContext } from '../context/auth'

import styles from '../styles/Navbar.module.css'

const Navbar = () => {

    const [auth, setAuth] = useAuthContext()

    const logout = () => {
        localStorage.setItem('id', '')
        localStorage.setItem('jwt', '')
        setAuth('')
    }

    return (
        <nav>
            <div className="logoNav">
                <Image
                    src='/favicon.ico'
                    width={50}
                    height={50}
                    alt='logo'
                />
            </div>
            <Link href='/' ><a className={styles.btn}>Home</a></Link>
            <Link href='/about' ><a className={styles.btn}>About</a></Link>
            <Link href='/timer' ><a className={styles.btn}>Timer</a></Link>
            {
                auth ?
                    <div onClick={logout} className={styles.btn}>Logout</div>
                    :
                    <Link href='/auth'><a><div>Account</div></a></Link>
            }
        </nav>
    )
}
export default Navbar;
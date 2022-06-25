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
                <Link href='https://github.com/h0lycow/PROD'>
                    <a>
                        <Image
                            src='/favicon.ico'
                            width={32}
                            height={32}
                            alt='logo'
                        />
                    </a>
                </Link>
            </div>
            <Link href='/' ><div className={styles.btn}>Home</div></Link>
            <Link href='/about' ><div className={styles.btn}>About</div></Link>
            <Link href='/timer' ><div className={styles.btn}>Timer</div></Link>
            {
                auth ?
                    <div onClick={logout} className={styles.btn}>Logout</div>
                    :
                    <Link href='/auth'><a className={styles.btn}><div>Account</div></a></Link>
            }
        </nav>

    )
}
export default Navbar;
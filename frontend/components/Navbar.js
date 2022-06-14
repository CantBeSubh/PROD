import Link from 'next/link'
import Image from 'next/image';

import { useAuthContext } from '../context/auth';

import LoginSignup from './LoginSignup';
import Logout from './Logout'
const Navbar = () => {
    const [auth,setAuth]=useAuthContext()

    const logout=()=>{
        setAuth('');
        localStorage.setItem('id','')
        localStorage.setItem('jwt','')
    }


    return ( 
        <nav>
            <div className="logo">
                <Image 
                src='/favicon.ico' 
                width={128/2} 
                height={128/2}
                alt='logo'
                />
            </div>
            <Link href='/'><a>Home</a></Link>
            <Link href='/'><a>About</a></Link>
            {auth.length>0?
                <Logout logout={logout}/>
                :
                <Link href='/login'><a><LoginSignup/></a></Link>
            }

            
        </nav>
     );
}
 
export default Navbar;
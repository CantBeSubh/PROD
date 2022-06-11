import Link from 'next/link'
import Image from 'next/image';

const Navbar = () => {
 
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
            <Link href='/'><a>Users</a></Link>
        </nav>
     );
}
 
export default Navbar;
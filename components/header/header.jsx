import styles from './header.module.css'
import Link from 'next/link'
export default function Header(){
    return(
        <nav className={styles.header}>
        <div className={styles.logo}>
           <Link href='/'>Home</Link>
        </div>
        <div className={styles.info}>
           <Link href='/'>Profile</Link>
           <Link href='/'>About</Link>
           <Link href='/login'>LogIn</Link>
        </div>
     </nav>
    )
}
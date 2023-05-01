import { useDispatch, useSelector } from 'react-redux'
import styles from './header.module.css'
import Link from 'next/link'
import { currentUserSelector } from '@/store/reducers/user.selector'
import { setCurrentUser } from '@/store/reducers/user.reducer'


export default function Header(){
   const currentUser = useSelector(currentUserSelector);
   const dispatch = useDispatch();
   function logOut(){
      dispatch(setCurrentUser());
   }
    return(
        <nav className={styles.header}>
        <div className={styles.logo}>
           <Link href='/'>Home</Link>
        </div>
        <div className={styles.info}>
           <Link href='/'>Profile</Link>
           <Link href='/'>About</Link>
           {
            currentUser ? <div className={styles.signOut} onClick={logOut}>Sign Out</div> :
            <Link href='/login'>LogIn</Link>
           }
        </div>
     </nav>
    )
}
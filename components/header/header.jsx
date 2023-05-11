import { useDispatch, useSelector } from 'react-redux'
import styles from './header.module.css'
import Link from 'next/link'
import { currentUserIdSelector, currentUserSelector } from '@/store/reducers/user.selector'
import { setCurrentUser } from '@/store/reducers/user.reducer'
import { useRouter } from 'next/router'


export default function Header(){
   const currentUser = useSelector(currentUserSelector);
   const currentUserId = useSelector(currentUserIdSelector);
   const dispatch = useDispatch();
   const router = useRouter();
    function  logOut(){
   dispatch(setCurrentUser());
    router.push('/')
   }
    return(
        <nav className={styles.header}>
        <div className={styles.logo}>
           <Link href='/'>Home</Link>
        </div>
        <div className={styles.info}>
           {currentUser ? <Link href={`/${currentUserId}`} >Profile</Link> :""}
           <Link href='/'>About</Link>
           {
            currentUser ? <div className={styles.signOut} onClick={logOut}>Sign Out</div> :
            <Link href='/login'>LogIn</Link>
           }
        </div>
     </nav>
    )
}
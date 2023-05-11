import { use } from 'react';
import styles from './aboutSection.module.css';
export default function AboutSection({user}){
    console.log(user,'from ');
    return(
        <div className={styles.container}>
        <img src={user.photo} alt="Profile picture" className={styles.profilePic} />
        <h1 className={styles.name}>{user.name}</h1>
        <h1 className={styles.name}>{user.email}</h1>
        </div>
    )
}
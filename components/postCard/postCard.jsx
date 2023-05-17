import React from 'react';
import styles from './post.module.css'; // Import Next.js styles
import { currentUserSelector } from '@/store/reducers/user.selector';
import { useSelector } from 'react-redux';
const PostCard = ({ seller, post }) => {
  console.log(seller);
  const deletePost = () => {
     
  }
  const { title, description, category, price, quantity, unit, photo, createdAt} = post;
  const date = new Date(createdAt).toLocaleString();
  //console.log(date,'card');
  return (
   <div  className={styles.post}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img src={seller.photo} className={styles.userPhoto} />
          <p className={styles.userName}>{seller.name}</p>
        </div>
        <p className={styles.createdAt}>{date}</p>
      </div>
      <div className={styles.details}>
        <img src={photo} alt={title} className={styles.postPhoto} />
        <div className={styles.postInfo}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <p className={styles.category}>Category: {category}</p>
          <p className={styles.price}>Price: {price} BDT</p>
          <p className={styles.quantity}>Quantity: {quantity} {unit}</p>
        </div>
      </div>
      <div>
        <button onClick={deletePost}> Delete Post </button>
      </div>
    </div>
  );
};

export default PostCard;

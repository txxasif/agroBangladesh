import React from 'react';
import styles from './post.module.css';
import Image from 'next/image';
const PostCard = ({ seller, post }) => {
  const deletePost = () => {
    // Delete post functionality
  };

  const { title, description, category, price, quantity, unit, photo, createdAt } = post;
  const date = new Date(createdAt).toLocaleString();
  const loader = () => photo;
  const loader2 = () => seller.photo;
  
  return (
    <div class="card">
                <div className={styles.topContainer}>
                    <div class={styles.photoContainer}>
                        <Image width='48' height='48' loader={loader2} className={styles.photo} src="./44.jpg" alt="" />
                    </div>
                    <div className={styles.infoContainer}>
                        <h3>{seller?.name || 'Sabbir'}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className={styles.postPhoto}>
                    <Image src={photo} width='230' height='230' loader={loader} alt="" className={styles.pPhoto}/>
                </div>
                <div className={styles.productDetailsContainer}>
                    <p>Category: {category}</p>
                    <p>Price : {price}$</p>
                    <p>Unit: {unit}</p>
                    <p>Available: {quantity}</p>

                </div>
                <div className= {styles.button}>
                    Buy Now
                </div>
            </div>
   
  );
};

export default PostCard;

// (
//   <div className={styles.productCard}>
//   <div className={styles.badge}>{'soldOut'}</div>
//   <div className={styles.productTumb}>
//     <img src={photo} alt="" />
//   </div>
//   <div className={styles.productDetails}>
//     <span className={styles.productCatagory}>{category}</span>
//     <h4><a href="">{seller.name}</a></h4>
//     <p>{description}</p>
//     <div className={productBottomDetails}>
//       <div className={styles.productPrice}>{price}</div>
//       <div className = {styles.productLinks }>
//         <a href=""><i class="fa fa-heart"></i></a>
//         <a href=""><i class="fa fa-shopping-cart"></i></a>
//       </div>
//     </div>
//   </div>
// </div>
// )
{/* <div className={styles.productCard}>
<div className={styles.badge}>{'soldOut'}</div>
<div className={styles.productTumb}>
  <img src={photo} alt="" />
</div>
<div className={styles.productDetails}>
  <span className={styles.productCatagory}>{category}</span>
  <h4><a href="">{seller.name}</a></h4>
  <p>{description}</p>
  <div className={styles.productBottomDetails}>
    <div className={styles.productPrice}>{price}</div>
    <div className = {styles.productLinks }>
      <a href=""><i class="fa fa-heart"></i></a>
      <a href=""><i class="fa fa-shopping-cart"></i></a>
    </div>
  </div>
</div>
</div>
);
}; */}
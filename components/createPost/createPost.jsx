import { useEffect, useState } from "react";
import styles from "./createPost.module.css";
import { currentUserIdSelector, isPostCreatedSelector } from "@/store/reducers/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync, setPostChecker } from "@/store/reducers/user.reducer";
import { useRouter } from "next/router";

const initialValue = {
    title: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    unit: '',
    photo: null,
    seller: null
}

export default function CreatePost() {
    const [form,setForm] = useState(initialValue);
    const id = useSelector(currentUserIdSelector);
    const dispatch =  useDispatch()
    console.log('hi');
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setForm((prevValues) => ({
          ...prevValues,
          [name]: type === 'file' ? files[0] : value,
        }));
        
      };
      
      const handleSubmit = (event) => {
         event.preventDefault();
         const data = {
          ...form,
          seller: id
         }
         dispatch(createPostAsync(data))
         console.log(data);
      }
   
  return (
    <form onSubmit={handleSubmit}  className={styles.postForm}>
      <div className={styles.postCard}>
        <div className={styles.postCardHeader}>
          <h3>Create a new post</h3>
        </div>
        <div className={styles.postCardContent}>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" required value={form.title} onChange={handleChange}/>
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
          <label htmlFor="category">Category:</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="ধান">ধান</option>
            <option value="গম">গম</option>
            <option value="শাকসবজি">শাকসবজি</option>
            <option value="ফল">ফল</option>
            <option value="মাছ">মাছ</option>
            <option value="হাঁস-মুরগি">হাঁস-মুরগি</option>
            <option value="গরু-ছাগল">গরু-ছাগল</option>
            <option value="মসলা">মসলা</option>
            <option value="পাট">পাট</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />
          <label htmlFor="unit">Unit:</label>
          <select name="unit"value={form.unit} onChange={handleChange} required>
            <option value="">Select a unit</option>
            <option value="কেজি">কেজি</option>
            <option value="লিটার">লিটার</option>
            <option value="পিস">পিস</option>
            <option value="বস্তা">বস্তা</option>
          </select>
          <label htmlFor="image">Image:</label>
          <input type="file" name="photo" onChange={handleChange} required />
        </div>
        <div className={styles.postCardFooter}>
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

import { useState } from "react";
//import styles from './signup.module.css';
import axios from "axios";

const defaultValue = {
  name: "",
  email: "",
  password: "",
  photo: ""
};

export default function SignUp() {
  const [form, setForm] = useState(defaultValue);
  const [photo,setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(photo);
    formData.append("file", photo);
    formData.append("upload_preset", "agrobd");
    const result = await axios.post('https://api.cloudinary.com/v1_1/dupffxzyk/image/upload',formData);
    if(result.statusText === "OK"){
       setForm({...form,["photo"]: result.data.secure_url});
       const response = await axios.post('/api/registration',form);
       console.log(response);
    }else{
      alert("Something went wrong")
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up Now!</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label>Photo</label>
        <input type="file" name="photo" onChange={handleImageChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { uploadPhoto} from "@/helper/registration/registration.helper";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "@/store/reducers/user.reducer";
import { currentUserSelector,currentUserErrorSelector,currentUserErrorTextSelector } from "@/store/reducers/user.selector";
import { useRouter } from "next/router";
const defaultValue = {
  name: "",
  email: "",
  password: "",
  photo: ""
};

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState(defaultValue);
  const [photo,setPhoto] = useState(null);
  const currentUser = useSelector(currentUserSelector);
  const isError = useSelector(currentUserErrorSelector);
  const errorMessage = useSelector(currentUserErrorTextSelector);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "agrobd");
    const result = await uploadPhoto(formData);
    if(result.statusText === "OK"){
       setForm({...form,["photo"]: result.data.secure_url});
       dispatch(createUserAsync(form)).then(()=>{
        if(currentUser){
          router.push('/')
        }
       })
      
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
          autoComplete={form.password}
          required
        />
        <label>Photo</label>
        <input type="file" name="photo" onChange={handleImageChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <h3>{isError ? errorMessage : null}</h3>
    </div>
  );
}

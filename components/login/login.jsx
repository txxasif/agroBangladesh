import { useState } from 'react';
import styles from './login.module.css';
const defaultValue = {
    email : '',
    pass: ''
}
export default function LogIn(){
    const [form,setForm] = useState(defaultValue);
    const handleChange = e => {
        const  {name,value} = e.target;
        setForm({...form,[name]:value});

    }  
    const handleSubmit = e => {
        e.preventDefault();
        alert(`${form.email}, ${form.pass}`);
    }
    return( 
        <div className='sign-in'>
            <h2>Already have a account?</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name='email' value={form.email} onChange={handleChange} required/>
                <label>Password</label>
                <input type="password" name='pass' value={form.pass} onChange={handleChange} required/>
                <button  type='submit'>Sign In</button>
            </form>

        </div>
    )
}
import { loginUserAsync } from '@/store/reducers/user.reducer';
import { currentUserSelector,currentUserErrorSelector,currentUserErrorTextSelector } from '@/store/reducers/user.selector';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const defaultValue = {
    email : '',
    password: ''
}
export default function LogIn(){
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector);
    const isError = useSelector(currentUserErrorSelector);
    const isErrorMessage = useSelector(currentUserErrorMessageSelector);
    const [form,setForm] = useState(defaultValue);
    const router = useRouter();
    const handleChange = e => {
        const  {name,value} = e.target;
        setForm({...form,[name]:value});

    }  
    const handleSubmit = async e => {
        e.preventDefault();
        useDispatch(loginUserAsync(form)).then(()=>{
            if(user){
                router.push('/');
            }
        })
    }
    return( 
        <div className='sign-in'>
            <h2>Already have a account?</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name='email' value={form.email} onChange={handleChange} required/>
                <label>Password</label>
                <input type="password" name='password' value={form.password} onChange={handleChange} required/>
                <button  type='submit'>Sign In</button>
                 { isError ?  <h3>{isErrorMessage}</h3> : null }
            </form>

        </div>
    )
}
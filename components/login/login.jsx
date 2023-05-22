import { loginUserAsync } from '@/store/reducers/user.reducer';
import { currentUserSelector,currentUserErrorSelector,currentUserErrorTextSelector} from '@/store/reducers/user.selector';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const defaultValue = {
    email : '',
    password: ''
}
export default function LogIn(){
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector);
    const isError = useSelector(currentUserErrorSelector);
    const isErrorMessage = useSelector(currentUserErrorTextSelector);
    const [form,setForm] = useState(defaultValue);
    const router = useRouter();
    const handleChange = e => {
        const  {name,value} = e.target;
        setForm({...form,[name]:value});

    } 
    useEffect(()=>{
            if(user){
                console.log(router.pathname);
                router.push('/');
            }
       
    },[user]); 
    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(loginUserAsync(form));
    }
   return(

<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
        <div>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        { isError ? <p>{isErrorMessage}</p> : null }
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
    </form>
</div>

   )
}

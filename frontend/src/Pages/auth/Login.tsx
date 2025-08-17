import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setUser } from '@/redux/authSlice.ts'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('User data:', input);
        try {
        const response= await axios.post('http://localhost:3000/api/v1/user/login', input, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if(response.data.success){
            navigate('/');
            dispatch(setUser({ user: response.data.user }));
            toast.success(response.data.message);
        }
        else{
            toast.error("Registration failed. Please try again.");
        }
        
    } catch (error:any) {
        if (error.response) {
            console.log("Error Response:", error.response.data);
            toast.error(error.response.data.message || "Registration failed");
        } else {
            console.log("Error:", error.message);
        }
    }
    };


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 mt-7'>
        <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
            <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Welcome Back</h1>
            <p className='text-center text-gray-600 mb-8'>Login to your account</p>


           
            <div className='mb-4'>
                <Label>Email Address</Label>
                <Input placeholder="Enter your email" className='mt-2'
                name='email' value={input.email} onChange={handleChange} type='email'/>
            </div>
            <div className='mb-4'>
                <Label>Password</Label>
                <Input placeholder="Create a password" className='mt-2'
                name='password' value={input.password} onChange={handleChange} type='password'/>
            </div>


            <Button onClick={handleSubmit} className='w-full bg-blue-500 hover:bg-blue-600'>Login</Button>

            <div className='flex items-center my-6'>
                <hr className='flex-grow border-gray-300'/>
                <span className='mx-3 text-gray-500 text-center'>OR</span>
                <hr className='flex-grow border-gray-300'/>
            </div>
            <p className='text-center mt-4'>Don't have an account? <Link to='/signup' className='text-blue-500 cursor-pointer'>Sign up</Link></p>
        </div>
    </div>
  )
}

export default Login
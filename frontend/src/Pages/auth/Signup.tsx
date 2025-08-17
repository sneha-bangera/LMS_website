import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Signup = () => {

    const navigate= useNavigate();

    const [user,setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
        ...prev,
        [name]: value
    }));
};

const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('User data:', user);
    try {
        const response= await axios.post('http://localhost:3000/api/v1/user/register', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if(response.data.success){
            navigate('/login');
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
            <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Create Your Account</h1>
            <p className='text-center text-gray-600 mb-8'>Join us today! It's quick and easy</p>


            <div className='mb-4'>
                <Label>Full Name</Label>
                <Input placeholder="Enter your  full name" className='mt-2' 
                name='name' value={user.name} type='text' id='name'
                onChange={handleChange}/>
            </div>
            <div className='mb-4'>
                <Label>Email Address</Label>
                <Input placeholder="Enter your email" className='mt-2'
                type='email' name='email' value={user.email} id='email'
                onChange={handleChange}/>
            </div>
            <div className='mb-4'>
                <Label>Password</Label>
                <Input placeholder="Create a password" className='mt-2'
                name='password' value={user.password} type='password' id='password'
                onChange={handleChange}/>
            </div>
            <div className='mb-4'>
                <Label>Role</Label>
                <RadioGroup className='flex mt-2'>
                    <div className='flex items-center space-x-2'>
                        <Input type='radio' value='student' name='role' id='role1'
                        checked={user.role === 'student'} onChange={handleChange}/>
                        <Label htmlFor='role1'>Student</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Input type='radio' value='instructor' name='role' id='role2'
                        checked={user.role === 'instructor'} onChange={handleChange}/>
                        <Label htmlFor='role2'>Instructor</Label>
                    </div>
                </RadioGroup>
            </div>

            <Button onClick={handleSubmit} className='w-full bg-blue-500 hover:bg-blue-600'>Sign Up</Button>
            <p className='text-center mt-4'>Already have an account? <Link to='/login' className='text-blue-500 cursor-pointer'>Login</Link></p>
        </div>
    </div>
  )
}

export default Signup
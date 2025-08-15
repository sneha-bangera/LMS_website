import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 mt-7'>
        <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
            <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Create Your Account</h1>
            <p className='text-center text-gray-600 mb-8'>Join us today! It's quick and easy</p>


            <div className='mb-4'>
                <Label>Full Name</Label>
                <Input placeholder="Enter your  full name" className='mt-2'/>
            </div>
            <div className='mb-4'>
                <Label>Email Address</Label>
                <Input placeholder="Enter your email" className='mt-2'/>
            </div>
            <div className='mb-4'>
                <Label>Password</Label>
                <Input placeholder="Create a password" className='mt-2'/>
            </div>
            <div className='mb-4'>
                <Label>Role</Label>
                <RadioGroup defaultValue='student' className='flex mt-2'>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='student' id='student'/>
                        <Label htmlFor='student'>Student</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='instructor' id='instructor'/>
                        <Label htmlFor='instructor'>Instructor</Label>
                    </div>
                </RadioGroup>
            </div>

            <Button className='w-full bg-blue-500 hover:bg-blue-600'>Sign Up</Button>
            <p className='text-center mt-4'>Already have an account? <Link to='/login' className='text-blue-500 cursor-pointer'>Login</Link></p>
        </div>
    </div>
  )
}

export default Signup
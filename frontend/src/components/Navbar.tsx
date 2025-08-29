import { GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((store: any) => store.auth);

  const logoutHandler = async() => {
    try {
      const res= await axios.get('http://localhost:3000/api/v1/user/logout', {withCredentials: true});
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null));
        toast.success('Logout successful');
      }
    } catch (error) {
      console.log(error);
      toast.error('Logout failed');
    }
  }

  return (
    <div className="bg-gray-900 top-0 w-full fixed z-50 px-5 py-3">
      <div className="max-w-7xl mx-auto flex justify-between">
        {/* logo sec */}
        <Link to="/">
          <div className="flex gap-1">
            <GraduationCap className="text-gray-300 w-10 h-10" />
            <h1 className="text-gray-300 font-bold text-3xl"></h1>
          </div>
        </Link>
        {/* links sec */}
        <nav>
          <ul className="flex gap-7 text-xl items-center font-semibold text-white">
            <Link to="/"><li>Home</li></Link>
            <Link to="/courses"><li>Courses</li></Link>
            {!user ? (
              <div className="flex gap-3">
                <Link to="/login">
                  <Button className="bg-blue-500 hover:bg-blue-600">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gray-700 hover:bg-gray-800">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-7">
                {
                  user.role === 'instructor' && <Link to='/admin/dashboard'><li className='cursoe-pointer'>Admin</li></Link>
                }
                <Link to="/profile">
                <Avatar>
                  <AvatarImage src={user.photoUrl} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </Link>
                <Button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-600">Logout</Button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

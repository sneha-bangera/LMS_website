import Home from './Pages/Home'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Courses from './Pages/Courses'
import Login from './Pages/auth/Login'
import Signup from './Pages/auth/Signup'
import Footer from './components/Footer'
import Profile from './Pages/Profile'


const router= createBrowserRouter([
  {
    path:'/',
    element: <><Navbar/><Home/></>
  },
  {
    path: '/courses',
    element: <><Navbar/><Courses/></>
  },
  {
    path:'/login',
    element: <><Navbar/><Login/></>
  },
  {
    path:'/signup',
    element: <><Navbar/><Signup/></>
  },
  {
    path:'/profile',
    element: <><Navbar/><Profile/></>
  },
])
const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    <Footer/>
    </>
  )
}

export default App
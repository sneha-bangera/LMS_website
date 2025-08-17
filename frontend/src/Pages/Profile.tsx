import { Button } from '@/components/ui/button'
import UserLogo from '../assets/profileLogo.png'
const Profil = () => {
  return (
    <div className=" bg-gray-100 py-12 px-4 lg:px-0">
        <div className="flex max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14">
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12"></div>
            {/* profile pic */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              <img src={UserLogo} alt="" className="w-full h-full object-cover"/>
            </div>

            {/* user info */}
            <div className='text-center md:text-left ml-10'>
              <h1 className='text-4xl font-bold text-blue-500'>Welcome, User</h1>
              <p className=' text-gray-600 mt-3'><span className='font-bold '>Email: </span>sia@gmail.com</p>
              <p className='text-gray-600 my-1 capitalize'><span className='font-bold'>Role: </span>Instructor</p>
              <p className='text-gray-700 text-base loading-relaxed mb-3'>
                <span className='font-bold'>Bio:</span> Add Your Bio
              </p>
              <Button className='bg-blue-500'>Edit Profile</Button>
            </div>
        </div>
    </div>
  )
}

export default Profil
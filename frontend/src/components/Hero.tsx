import { Award, Search, User } from 'lucide-react'
import HeroImg from '../assets/heroImg.png'
import CountUp from 'react-countup'

const Hero = () => {
  return (
    <div className='bg-slate-800 pt-14'>
        <div className='lg:h-[650px] max-w-7xl mx-auto flex md:flex-row flex-col gap-10 item-center justify-center' >

          {/* text section  */}
            <div className='space-y-7 mt-30 w-[70%] ml-10 px-4 md:px-0'>
                <h1 className='text-4xl mt-10 md:mt-0 md:text-6xl font-extrabold text-gray-200'>Explore Our <span className='text-blue-500'>1400+</span> <br />Online Courses for All</h1>
                <p className='text-gray-300 text-lg'>Join the courses to enhance your resumes by getting certified course and improve your skills</p>
                <div className='inline-flex relative'>
                  <input type="text" placeholder='Search Your Course Here...' className='bg-gray-200 w-[350px] md:w-[450px] text-gray-800 p-4 pr-40 rounded-lg placeholder:text-gray-500'/>
                  <button className='px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl cursor-pointer'>Search<Search width={20} height={20}/></button>
                </div>
            </div>

            {/* img section  */}
            <div className='flex md:h-[650px] item-end relative px-4 md:px-0'>
              <img src={HeroImg} alt="" className='shadow-blue-500 drop-shadow-lg'/>
              <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[35%] right-0 px-4 py-2 mr-5'>
                <div className='rounded-full bg-blue-400 p-2 text-white'>
                  <User/>
                </div>
                <div>
                  <h2 className='font-bold text-lg'><CountUp end={1000}/>+</h2>
                  <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
                </div>
              </div>

              <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[15%] left-8 px-4 py-2 mr-5'>
                <div className='rounded-full bg-blue-400 p-2 text-white'>
                  <Award/>
                </div>
                <div>
                  <h2 className='font-bold text-lg'><CountUp end={650}/>+</h2>
                  <p className='italic text-sm text-gray-600 leading-none'>Certified Students</p>
                </div>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Hero
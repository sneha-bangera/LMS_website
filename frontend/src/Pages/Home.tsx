import Hero from '@/components/Hero'
import CourseCard from '@/components/CourseCard'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '@/redux/courseSlice';
import  { type RootState } from '@/redux/store';

const Home = () => {

  const dispatch = useDispatch()
  const course= useSelector((store:RootState)=> store.course)
  useEffect(()=> {
    const getAllPublishedCourse= async()=> {
      try {
        const res= await axios.get(`http://localhost:3000/api/v1/course/published-courses`, {withCredentials:true})
        if(res.data.success){
          dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getAllPublishedCourse()
  })

  return (
    <>
    <Hero/>
    <div className='py-10'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
      <p className='text-center text-gray-600 mb-12'>Explore our curated courses to boost your skills and career. Whether you are a beginner or an expert, we have something for everyone.</p>    
    </div>
    <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6'>
      {
      course.slice(0,5).map((course, index)=> {
        return <CourseCard course={course} key={index}/>
      })
    }
    </div>
    
    </>
  )
}

export default Home
import { courses } from './Courses'
import Hero from '@/components/Hero'
import CourseCard from '@/components/CourseCard'

const Home = () => {
  return (
    <>
    <Hero/>
    <div className='py-10'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
      <p className='text-center text-gray-600 mb-12'>Explore our curated courses to boost your skills and career. Whether you are a beginner or an expert, we have something for everyone.</p>    
    </div>
    <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6'>
      {
      courses.slice(0,5).map((course)=> {
        return <CourseCard course={course}/>
      })
    }
    </div>
    
    </>
  )
}

export default Home
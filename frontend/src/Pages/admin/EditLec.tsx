import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import LecTab from './LecTab'

const EditLec = () => {

    const params= useParams()
    const courseId= params.courseId
  return (
    <div className='p-4 md:p-10 h-screen'>
        <div className='flex items-center justify-between mb-5'>
            <div className='flex items-center gap-2'>
                <Link to={`/admin/course/${courseId}/lecture`}>
                    <Button size='icon' className='rounded-full' variant='outline'><ArrowLeft size={16}/></Button>
                </Link>
                <h1 className='font-bold text-xl'>Update Your Lectures</h1>
            </div>
        </div>
        <LecTab/>
    </div>
  )
}

export default EditLec
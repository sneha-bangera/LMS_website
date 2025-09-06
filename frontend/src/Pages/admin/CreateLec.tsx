import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLecture } from '@/redux/lecSlice'
import type { RootState } from '@/redux/store'
import axios from 'axios'
import { Edit, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CreateLec = () => {

    const params= useParams()
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const [lectureTitle,setLectureTitle]= useState("")
    const [loading, setLoading] = useState(false)
    const lecture = useSelector((store: RootState) => store.lecture)

    const createLecHandler= async()=> {
        try {
            setLoading(true)
            const res= await axios.post(`http://localhost:3000/api/v1/course/${params?.courseId}/lecture`, {lectureTitle}, {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
            }else{
                toast.error(res.data.error)
            }
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        const getLectures= async()=>{
            try {
                const res= await axios.get(`http://localhost:3000/api/v1/course/${params?.courseId}/lecture`, {withCredentials:true})
                if(res.data.success){
                    dispatch(setLecture(res.data.lectures))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getLectures()
    }, [lecture])
  return (
    <div className='p-4 md;p-10 md:pr-20 h-screen'>
        <h1 className='text-2xl font-bold mb-2'>Lets Add <span className='text-blue-500'>Lectures</span></h1>
        <p>Add lectures as per your schedule with easy.</p>

        <div className='mt-10 space-y-5'>
            <div>
                <Label>Title</Label>
                <Input type='text' placeholder='Lecture Name' className='bg-white'
                value={lectureTitle} onChange={(e)=> setLectureTitle(e.target.value)}/>
            </div>
            <div className='flex gap-2'>
                <Button onClick={()=> navigate(`/admin/course/${params.courseId}`)} variant='outline'>Back to Course</Button>
                <Button disabled={loading} onClick={createLecHandler} className='bg-gray-800 hover:bg-gray-600'>
                    {
                        loading? <><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</> : "Create Lecture"
                    }
                </Button>
            </div>
        </div>

        <div className='mt-10'>
            {
                lecture?.map((lecture, index)=> {
                    return <div key={index} className='flex items-center justify-between bg-[#f7f9fa] px-4 py-2 rounded-md my-2'>
                        <h1 className='font-bold text-gray-800 '>Lecture - {index+1}: {lecture.lecTitle}</h1>
                        <Edit onClick={()=> navigate(`${lecture._id}`)} size={20} className='cursor-pointer tet-gray-600 hover:text-blue-600'/>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default CreateLec
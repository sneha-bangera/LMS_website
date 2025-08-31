import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const CreateLec = () => {

    const params= useParams()
    const dispatch = useDispatch()
    const [lectureTitle,setLectureTitle]= useState("")
    const [loading, setLoading] = useState(false)

    const createLecHandler= async()=> {
        try {
            setLoading(true)
            const res= await axios.post(`http://localhost:3000/api/v1/course/${params?.courseId}/lecture`, {lectureTitle}, {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
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
                    // dispatch()
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    })
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
                <Button variant='outline'>Back to Course</Button>
                <Button disabled={loading} onClick={createLecHandler} className='bg-gray-800 hover:bg-gray-600'>
                    {
                        loading? <><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</> : "Create Lecture"
                    }
                </Button>
            </div>
        </div>
    </div>
  )
}

export default CreateLec
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { setLecture } from '@/redux/lecSlice'
import type { RootState } from '@/redux/store'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const LecTab = () => {

    const params= useParams()
    const {courseId, lectureId}= params
    // const {lecture} = 
    const lecture = useSelector((store: RootState) => store.lecture)
    const selectedLecture= lecture.find(lecture=> lecture._id === lectureId)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lecTitle || "")
    const [uploadVideoInfo, setUploadVideoInfo] = useState<{ videoUrl: string; publicId: string } | null>(null)
    const [isFree, setIsFree]= useState(selectedLecture?.isPreviewFree || false)
    const [mediaProgress, setMediaProgress]= useState(false)
    const [uploadProgress, setUploadProgress]= useState(0)
    const [loading, setLoading]= useState(false)
    const [removeLoading, setRemoveLoading]= useState(false)
    
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const fileChangeHandler= async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const file= e.target.files?.[0]
        if(file){
            const formData= new FormData()
            formData.append('file', file)
            setMediaProgress(true)
            try {
                const res= await axios.post(`http://localhost:3000/api/v1/media/upload-video`, formData,{
                    onUploadProgress: ({loaded, total})=>{
                        if (total) {
                            setUploadProgress(Math.round((loaded * 100) / total))
                        }
                    }
                })
                if(res.data.success){
                    setUploadVideoInfo({
                        videoUrl: res.data.url,
                        publicId: res.data.data.public_id
                    })
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error('video upload failed')
            }finally{
                setMediaProgress(false)
            }
        }
    }

    const editLectureHandler= async(e: React.FormEvent)=> {
        e.preventDefault()
        const data= {
            lecTitle: lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree: isFree,
        }
        try {
            setLoading(true)
            const res= await axios.post(`http://localhost:3000/api/v1/course/${courseId}/lecture/${lectureId}`, data, {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setLecture([...lecture, res.data.lecture]))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('failed to edit lec')
        }finally{
            setLoading(false)
        }
    }

    const removeLecHandler= async(e: React.FormEvent)=> {
        e.preventDefault()
        try {
            setRemoveLoading(true)
            const res= await axios.delete(`http://localhost:3000/api/v1/course/lecture/${lectureId}`, {withCredentials: true})
            if(res.data.success){
                navigate(`/admin/course/${courseId}/lecture`)
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('failed to remove lec')
        }finally{
            setRemoveLoading(false)
        }
    }

  return (
    <Card>
        <CardHeader>
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>Make changes and click save when done.</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button disabled={removeLoading} variant='destructive' onClick={removeLecHandler}>
                    {
                        removeLoading? <><Loader2 className='mr-1 w-4 h-4 animate-spin'/>Please wait</> : "Remove Lecture"
                    }
                </Button>
            </div>
        </CardHeader>

        <CardContent>
            <div>
                <Label>Title</Label>
                <Input type='text' placeholder='Ex. INtroduction to JavaScript' value={lectureTitle} onChange={(e)=> setLectureTitle(e.target.value)}/>
            </div>
            <div className='my-5'>
                <Label>Video<span className='text-red-500'>*</span></Label>
                <Input type='file' accept='video/*' className='w-fit' onChange={fileChangeHandler}/>
            </div>
            <div className='flex items-center space-x-2 my-5'>
                <Switch checked={isFree} onCheckedChange={setIsFree} className='bg-gray-800'/>
                <Label>Is this video FREE</Label>
            </div>
            {
                mediaProgress && (
                    <div className='my-4'>
                        <Progress value={uploadProgress}/>
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )
            }
            <div className='mt-4'>
                <Button disabled={loading} onClick={editLectureHandler} className='bg-gray-800 hover:bg-gray-800'>
                    {
                        loading ? <><Loader2 className='mr-1 w-4 h-4 animate-spin'/>Please wait</> : "Update Lecture"
                    }
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LecTab
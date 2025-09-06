import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const LecTab = () => {

    const params= useParams()
    const {courseId, lectureId}= params
    // const {lecture} = 
    const lecture = useSelector((store: RootState) => store.lecture)

  return (
    <Card>
        <CardHeader>
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>Make changes and click save when done.</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant='destructive'>Remove Lecture</Button>
            </div>
        </CardHeader>

        <CardContent>
            <div>
                <Label>Title</Label>
                <Input type='text' placeholder='Ex. INtroduction to JavaScript'/>
            </div>
            <div className='my-5'>
                <Label>Video<span className='text-red-500'>*</span></Label>
                <Input type='file' accept='video/*' placeholder='Ex. INtroduction to JavaScript' className='w-fit'/>
            </div>
            <div className='flex items-center space-x-2 my-5'>
                <Switch className='bg-gray-800'/>
                <Label>Is this video FREE</Label>
            </div>
            <div className='mt-4'>
                <Button className='bg-gray-800 hover:bg-gray-800'>Update Lecture</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LecTab
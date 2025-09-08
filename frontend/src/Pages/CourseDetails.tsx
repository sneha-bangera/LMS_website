import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { RootState } from "@/redux/store"
import axios from "axios"
import { ArrowLeft, Lock, PlayCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
// import ReactPlayer from 'react-player'
import { Separator } from "@/components/ui/separator"
const CourseDetails = () => {

    const navigate= useNavigate()
    const params= useParams()
    const courseId =params.courseId
    const course = useSelector((store:RootState)=> store.course)
    const selectedCourse= course.find(course=> course._id===courseId) 
    
    interface Lecture {
    _id: string;
    lecTitle: string;
    videoUrl?: string;
    isPreviewFree?: boolean;
    }
    const [courseLec, setCourseLec]= useState<Lecture[]>([])

    useEffect(()=>{
        const getCourseLecture= async()=>{
            try {
                const res= await axios.get(`http://localhost:3000/api/v1/course/${courseId}/lecture`, {withCredentials:true})
                if(res.data.success){
                    setCourseLec(res.data.lectures)
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getCourseLecture()
    },[courseId])
  return (
    <div className="bg-gray-100 md:p-10">
        <Card className="max-w-7xl rounded-md mx-auto bg-white shadow-mdpt-5 mt-14">
            <div className="px-4 py-1">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Button size='icon' variant={'outline'} className="rounded-full" onClick={()=> navigate('/')}><ArrowLeft size={16}/></Button>
                        <h1 className="md:text-2xl font-bold text-gray-800">{selectedCourse?.courseTitle}</h1>
                    </div>
                    <div className="flex space-x-4">
                        <Button className="bg-blue-500 hover:bg-blue-600">Enroll Now</Button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <img src={selectedCourse?.courseThumbnail} alt="Thumbnail" className="w-full lg:w-1/3 rounded-md mb-4 lg:mb-0"/>
                    <div>
                        <p className="text-gray-800 mb-4 font-semibold capitalize">{selectedCourse?.subtitle}</p>
                        {/* <p className="mb-4 text-gray-700">{selectedCourse?.description || 'No description available'}</p> */}
                        <div
                            className="mb-4 text-gray-700"
                            dangerouslySetInnerHTML={{ __html: selectedCourse?.description || "" }}
                        />

                        <p className="text-gray-800 font-semibold">⭐⭐⭐⭐⭐ (4.8) | 1,200 reviews</p>
                        <div className="mt-1">
                            <p className="text-2xl font-bold text-gray-800">₹{selectedCourse?.coursePrice}</p>
                            <p className="text-gray-500 line-through">₹500</p>
                        </div>
                        <ul className="mt-4 space-y-2">
                            <li className="text-gray-600">✓ 30+ hours of video content</li>
                            <li className="text-gray-600">✓ Lidetime access to course material</li>
                            <li className="text-gray-600">✓ Certificate of completion</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Build dynamic web application with React and Node.js</li>
                    <li>Deploy websites with modern tools like Vercel and Netlify</li>
                    <li>Undersatnd REST APIs and database integration</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Requirements</h2>
                <p className="text-gray-700">Basic programming knowledge is helpful but not required</p>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Who This Course is For</h2>
                <p className="text-gray-700">Beginners, aspiring developers, and professionals looking to upgrade skills.</p>
            </div>

            {
                courseLec?.length==0 ? null : <div className="flex flex-col md:flex-row justify-between gap-10 p-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800">Course Curriculum</h2>
                        <p className="text-gray-700 italic my-2">{courseLec?.length} Lectures</p>
                        <div className="space-y-4">
                            {
                                courseLec?.map((lecture, index)=> {
                                    return <div key={index} className="flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer">
                                        <span>
                                            {lecture.isPreviewFree ? <PlayCircle size={20}/> : <Lock size={20}/>}
                                        </span>
                                        <p>{lecture.lecTitle}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <Card>
                            <CardContent className="p-4 flex flex-col">
                                <div className="w-full aspect-video mb-4">
                                    <video
                                    width="100%"
                                    height="100%"
                                    src={courseLec?.[0]?.videoUrl || ""}
                                    controls
                                    className="rounded-md"
                                    />

                                    {/* <ReactPlayer width='100%' height='100%' url={courseLec && courseLec[0]?.videoUrl ? courseLec[0].videoUrl : ""} controls={true}/>  */}
                                    {/* {courseLec && courseLec[0]?.videoUrl && (
                                        <ReactPlayer
                                            width="100%"
                                            height="100%"
                                            url={courseLec[0].videoUrl}
                                            controls
                                        />
                                    )} */}
                                </div>

                                <h1>{courseLec? courseLec[0]?.lecTitle: "Lecture Title"}</h1>
                                <Separator className="my-2"/>
                                <p>This is a basic introduction lecture, which will give you all a brief idea of what you will learn throughtout the course.</p>
                            </CardContent>

                            <CardFooter className="flex p-4">
                                <Button>Continue Course</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            }

        
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Instructor</h2>
                    <div className="flex items-center space-x-4">
                        <img src={selectedCourse?.creator.photoUrl} alt="instructor" className="w-16 h-16 rounded-full"/>
                        <div>
                            <h3 className="text-lg font-extrabold text-gray-800">
                                {selectedCourse?.creator.name}
                            </h3>
                            <p className="text-gray-600">Senior Full-Stack Developer</p>
                        </div>
                    </div>
                    <p className="text-gray-700 mt-4">
                        {/* {selectedCourse?.creator.description} */}
                    </p>
                </div>
            
        </Card>
    </div>
  )
}

export default CourseDetails
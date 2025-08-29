import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const CreateCourse = () => {

    const navigate= useNavigate()
    const [loading, setLoading]= useState(false)
    const [courseTitle, setCourseTitle]= useState("")
    const [category, setCategory]= useState("")

    const getSelectedCategory = (value: typeof category)=> {
        setCategory(value)
    }
    const createCourseHandler = async()=> {
        try {
            setLoading(true)
            const res= await axios.post('http://localhost:3000/api/v1/course', {courseTitle, category}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if(res.data.success){
                setLoading(false)
                navigate("/admin/course")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false)
        }
    }

  return (
    <div className="p-10 md:pr-20 h-screen">
        <h1 className="text-2xl font-bold">Lets Add <span className="text-blue-500">Courses</span></h1>
        <p>Create courses that you want to publish and add lectures for each courses.</p>
        <div className="mt-10">
            <div>
                <Label>Title</Label>
                <Input type="text" value={courseTitle} onChange={(e)=> setCourseTitle(e.target.value)} placeholder="Your course name" className="bg-white"/>
            </div>
            <div className="mt-4 mb-5">
                <Label>Category</Label>
                <Select onValueChange={getSelectedCategory}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                        <SelectItem value="Next JS">Next JS</SelectItem>
                        <SelectItem value="Docker">Docker</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                        <SelectItem value="Backend Development">Backend Development</SelectItem>
                        <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-2">
                <Button onClick={()=> navigate('/admin/course')} variant="outline">Cancel</Button>
                <Button onClick={createCourseHandler} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
                {
                    loading? <><Loader2 className="animate-spin mr-2 h-4 w-4"/>Please wait</>: "Create"
                }
                </Button>
            </div>
        </div>
    </div>
  )
}

export default CreateCourse
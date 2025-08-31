import RichTextEditor from "@/components/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { setCourse } from "@/redux/courseSlice"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import type { RootState } from "@/redux/store"
import type { CourseType } from "@/redux/courseSlice"

const CourseTab = () => {
  const params = useParams()
  const id = params.courseId
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const course = useSelector((store: RootState) => store.course)
  const selectCourse = course.find((c: CourseType) => c._id === id)

  const [loading, setLoading] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(selectCourse || null)

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle || "",
    subTitle: (selectedCourse as any)?.subTitle || "",
    description: (selectedCourse as any)?.description || "",
    category: (selectedCourse as any)?.category || "",
    courseLevel: (selectedCourse as any)?.courseLevel || "",
    coursePrice: selectedCourse?.coursePrice || 0,
    courseThumbnail: "" as any
  })

  const [previewThumbnail, setPreviewThumbnail] = useState<string | undefined>(selectedCourse?.courseThumbnail)

  const getCourseById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/course/${id}`, { withCredentials: true })
      if (res.data.success) {
        setSelectedCourse(res.data.course)
        setInput({
          courseTitle: res.data.course.courseTitle,
          subTitle: res.data.course.subTitle,
          description: res.data.course.description,
          category: res.data.course.category,
          courseLevel: res.data.course.courseLevel,
          coursePrice: res.data.course.coursePrice,
          courseThumbnail: res.data.course.courseThumbnail
        })
        setPreviewThumbnail(res.data.course.courseThumbnail)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) getCourseById()
  }, [id])

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const selectCategory = (value: string) => {
    setInput({ ...input, category: value })
  }

  const selectCourseLevel = (value: string) => {
    setInput({ ...input, courseLevel: value })
  }

  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setInput({ ...input, courseThumbnail: file })
      const fileReader = new FileReader()
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result as string)
      fileReader.readAsDataURL(file)
    }
  }

  const updateCourseHandler = async () => {
    const formData = new FormData()
    formData.append("courseTitle", input.courseTitle)
    formData.append("subTitle", input.subTitle)
    formData.append("description", input.description)
    formData.append("category", input.category)
    formData.append("courseLevel", input.courseLevel)
    formData.append("coursePrice", input.coursePrice.toString())
    if (input.courseThumbnail) {
      formData.append("file", input.courseThumbnail)
    }

    try {
      setLoading(true)
      const res = await axios.put(`http://localhost:3000/api/v1/course/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate("lecture")
        toast.success(res.data.message)

        dispatch(setCourse([...course.filter((c: CourseType) => c._id !== id), res.data.course]))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
        </div>

        <div className="space-x-2">
          <Button className="bg-gray-800">Publish</Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input value={input.courseTitle ?? ""} onChange={changeEventHandler} type="text" name="courseTitle" placeholder="Ex. Fullstack Development" />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input value={input.subTitle ?? ""} onChange={changeEventHandler} type="text" name="subTitle" placeholder="Ex. Become a Fullstack Developer from zero to hero in 2 months" />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
            <div>
              <Label>Category</Label>
              <Select defaultValue={input.category ?? ""} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
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

            <div>
              <Label>Course Level</Label>
              <Select defaultValue={input.courseLevel ?? ""} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price in (INR)</Label>
              <Input value={input.coursePrice ?? 0} onChange={changeEventHandler} type="number" name="coursePrice" placeholder="199" className="w-fit" />
            </div>

            <div>
              <Label>Course Thumbnail</Label>
              <Input onChange={selectThumbnail} type="file" id="file" accept="image/*" />
              {previewThumbnail && <img src={previewThumbnail} alt="Thumbnail" className="w-64 my-2" />}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/course")} variant="outline">Cancel</Button>
            <Button className="bg-gray-800" disabled={loading} onClick={updateCourseHandler}>
              {loading ? (<><Loader2 className="mr-2 w-4 h-4 animate-spin" />Please wait</>) : ("Save")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab

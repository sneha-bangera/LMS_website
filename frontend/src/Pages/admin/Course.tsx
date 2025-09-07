import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { setCourse } from "@/redux/courseSlice"
import axios from "axios"
import { Edit } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import type { RootState } from "@/redux/store"
// import type { CourseType } from "@/redux/courseSlice"

const Course = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const courses = useSelector(
    (store: RootState) => store.course
  ) || []; 

  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/course",
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCreatorCourse()
  }, [dispatch])

  return (
    <div className="md:p-10 p-4 w-full h-screen">
      <Link to="create">
        <Button className="bg-blue-500">Create Course</Button>
      </Link>

      <Table className="mt-10">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Course</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="md:w-[300px] flex items-center gap-2">
                <img
                  src={course?.courseThumbnail}
                  alt="Thumbnail"
                  className="w-12 object-cover rounded md:block"
                />
                {course.courseTitle}
              </TableCell>
              <TableCell className="font-medium text-right">
                {course.coursePrice || "NA"}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={
                    course.isPublished ? "bg-green-400" : "bg-red-400"
                  }
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" onClick={()=> navigate(`/admin/course/${course._id}`)}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Course

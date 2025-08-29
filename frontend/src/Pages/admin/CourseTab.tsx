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
import { useNavigate } from "react-router-dom"


const CourseTab = () => {

    const navigate= useNavigate()
  return (
    <Card>
        <CardHeader className="flex md:flex-row justify-between">
            <div>
                <CardTitle>Basic Course Information</CardTitle>
                <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
            </div>

            <div className="space-x-2">
                <Button className="bg-gray-800">Publish</Button>
                <Button variant='destructive'>Remove Course</Button>
            </div>
        </CardHeader>

        <CardContent>
            <div className="space-y-4 mt-5">
                <div>
                    <Label>Title</Label>
                    <Input type='text' name="courseTitle" placeholder="Ex. Fullstack Development"/>
                </div>

                <div>
                    <Label>Subtitle</Label>
                    <Input type='text' name="subTitle" placeholder="Ex. Become a Fullstack Developer from zero to hero in 2 months"/>
                </div>

                <div>
                    <Label>Description</Label>
                    <RichTextEditor/>
                </div>

                <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
                    <div>
                        <Label>Category</Label>
                        <Select>
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
                        <Select>
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
                        <Input type="number" name="coursePrice" placeholder="199" className="w-fit"/>
                    </div>

                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input type="file" id="file" accept="image/*"/>
                    </div>
                    
                </div>
                <div className="flex gap-2">
                        <Button onClick={()=> navigate('/admin/course')} variant='outline'>Cancel</Button>
                        <Button className="bg-gray-800">Save</Button>
                    </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default CourseTab
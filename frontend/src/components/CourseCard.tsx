import { Card } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';


const CourseCard = ({ course }) => {
  const navigate= useNavigate()
  const user= useSelector((store:RootState)=> store.auth)
  return (
    <Card className="bg-white shadow-lg">
      <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{course.courseTitle}</h2>
        <p className="text-gray-600 mb-4">{course.subtitle}</p>
        <Button onClick={()=>navigate(user ? `/courses/${course._id}` : "/login")}>Learn More</Button>
      </div>
    </Card>
  );
};

export default CourseCard;

import type { FC } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

// Define the shape of the course prop
export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <Card className="bg-white shadow-lg">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <Button>Learn More</Button>
      </div>
    </Card>
  );
};

export default CourseCard;

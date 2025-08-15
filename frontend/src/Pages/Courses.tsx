import type { FC } from 'react';
import type { Course } from "@/components/CourseCard";
import CourseCard from '@/components/CourseCard';

export const courses: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Learn to build dynamic and responsive web applications using HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
    image: "https://example.com/images/fullstack.jpg"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Master Python programming with a focus on data analysis, visualization, and machine learning using libraries like Pandas, NumPy, and Scikit-learn.",
    image: "https://example.com/images/python_ds.jpg"
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Understand the principles of user interface and experience design, and create visually appealing, user-friendly designs using Figma and Adobe XD.",
    image: "https://example.com/images/uiux.jpg"
  },
  {
    id: 4,
    title: "Machine Learning with TensorFlow",
    description: "Build and deploy machine learning models using TensorFlow, covering both supervised and unsupervised learning techniques.",
    image: "https://example.com/images/ml_tf.jpg"
  },
  {
    id: 5,
    title: "Digital Marketing Strategies",
    description: "Learn SEO, social media marketing, email marketing, and paid ads to grow and promote your business online effectively.",
    image: "https://example.com/images/digital_marketing.jpg"
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Gain hands-on experience with AWS services like EC2, S3, RDS, and Lambda to design and deploy scalable cloud applications.",
    image: "https://example.com/images/aws_cloud.jpg"
  }
];

const Courses: FC = () => {
  return (
    <div className='bg-gray-100 pt-14'>
      <div className='min-h-screen max-w-7xl mx-auto pt-10'>
        <div className='px-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
          <p className='text-center text-gray-600 mb-12'>
            Explore our curated courses to boost your skills and career. Whether you are a beginner or an expert, we have something for everyone.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

import { Course } from "../models/course.model.js";
import cloudinary from "../utils/cludinary.js";
import getDataUri from "../utils/dataUri.js";

export const createCourse = async(req, res)=> {
    try {
        const {courseTitle, category} = req.body
        if(!courseTitle || !category){
            return res.status(400).json({
                message: "course title n category is required",
                success: false
            })
        }

        const course= await Course.create({
            courseTitle,
            category,
            creator: req.id
        })
        return res.status(201).json({
            success: true,
            course,
            message: "Course created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.this.status(500).json({
            
        })
        
    }
}

export const getPublishedCourse= async(_, res)=> {
    try {
        const courses= await Course.find({isPublished: true})
        if(!courses){
            return res.status(404).json({
                message: "Course not found",
                // success: false
            })
        }
        return res.status(200).json({
            success: true,
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.this.status(500).json({
            message: "Failed to create",
            success: false
        })
    }
}

export const getCreatedCourses = async(req, res)=> {
    try {
        const userId= req.id
        const courses = await Course.find({creator: userId})
        if(!courses){
            return res.status(404).json({
                message: "Course not found",
                courses: [],
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            courses,
        })

    } catch (error) {
        console.log(error);
        return res.this.status(500).json({
            message: "Failed to create",
            success: false
        })
    }
}

export const editCourse= async(req,res)=> {
    try {
        const courseId= req.params.courseId
        const {courseTitle, subTitle, description, category, courseLevel, coursePrice}= req.body
        const file= req.file

        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:"Course not found",
            })
        }
        let courseThumbnail
        if(file){
            const fileUri = getDataUri(file)
            courseThumbnail = await cloudinary.uploader(fileUri)

        }
        const updateData= {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url}
        course= await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json({
            success: true,
            course,
            message: "Course updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.this.status(500).json({
            message: "Failed to update course",
            success: false
        })
    }

}


export const getCourseById= async(req, res)=>{
    try {
        const {courseId}= req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message: 'course not found',
                success: false
            })
        }

        return res.status(200).jsoon({
            success: true,
            course
        })
    } catch (error) {
        console.log(error);
        return res.this.status(500).json({
            message: "Failed to get course",
            success: false
        })   
    }
}
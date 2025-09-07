import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lec.model.js";
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
        const courses= await Course.find({isPublished: true}).populate({path: "creator", select: "name photoUrl description"})
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
        const courses = await Course.find({creator: userId}).populate('lectures')
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
        const {courseId}= req.params
        const {courseTitle, subTitle, description, category, courseLevel, coursePrice}= req.body
        const file= req.file

        let course = await Course.findById(courseId).populate('lectures')
        if(!course){
            return res.status(404).json({
                message:"Course not found",
                success: false
            })
        }

        let courseThumbnail
        if(file){
            const fileUri = getDataUri(file)
            console.log("File URI =>", fileUri.substring(0,50)); 

            const uploaded= await cloudinary.uploader.upload(fileUri)
            courseThumbnail = uploaded.secure_url

        }

        const updateData= {courseTitle, subTitle, description, category, courseLevel, coursePrice, }
        if(courseThumbnail){
            updateData.courseThumbnail= courseThumbnail
        }

        course= await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json({
            success: true,
            course,
            message: "Course updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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

        return res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get course",
            success: false
        })   
    }
}


//for lec
export const createLec= async(req,res)=> {
    try {
        const {lecTitle}= req.body
        const {courseId}= req.params

        if(!lecTitle || !courseId){
            return res.status(400).json({
                message:"Lec title is required"
            })
        }
        const lecture= await Lecture.create({lecTitle})
        const course= await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
            await course.save()
        }

        return res.status(200).json({
            success:true,
            lecture,
            message:"Lec created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create lec",
            success: false
        }) 
    }
}


export const getCourseLec= async(req,res)=> {
    try {
        const {courseId}= req.params
        const course= await Course.findById(courseId).populate("lectures")
        if(!course){
            return res.status(400).json({
                message:"Lec not fond"
            })
        }
        return res.status(200).json({
            success:true,
            lectures: course.lectures
            // message:"Lec created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lec",
            success: false
        }) 
    }
}

export const editLec= async(req,res)=> {
    try {
        const {lecTitle, videoInfo, isPreviewFree}=  req.body
        const {courseId, lectureId}= req.params
        const lecture= await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(400).json({
                message:"Lec not fond"
            })
        }
        if(lecTitle) lecture.lecTitle= lecTitle
        if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        lecture.isPreviewFree= isPreviewFree

        await lecture.save()

        const course= await Course.findById(courseId)
        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id)
            await course.save()
        }

        return res.status(200).json({
            success:true,
            lecture,
            message:"Lec updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to edit lec",
            success: false
        }) 
    }
}


export const removeLec= async(req,res)=> {
    try {
        const {lectureId}= req.params
        const lecture= await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(400).json({
                message:"Lec not found",
                success:false
            })
        }
        await Course.updateOne(
            {lectures: lectureId},
            {$pull: {lectures:lectureId}}
        )
        return res.status(200).json({
            success:true,
            message:"Lec removed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to remove lec",
            success: false
        }) 
    }
}

export const togglePublishedCourse= async(req, res)=>{
    try {
        const {courseId}=req.params
        const {publish}= req.query
        const course= await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:'course not found'
            })
        }
        course.isPublished= !course.isPublished
        await course.save()

        const statusMessage= course.isPublished ? "Published" : "Unpublished"
        return res.status(200).json({
            success: true,
            message: `course is ${statusMessage}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"failed to update status"
        })
    }
}
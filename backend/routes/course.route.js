import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createCourse, createLec, editCourse, editLec, getCourseById, getCourseLec, getCreatedCourses, getPublishedCourse, removeLec, togglePublishedCourse } from "../controllers/course.controller.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()

router.route("/").post(isAuthenticated, createCourse)
router.route("/published-courses").get(getPublishedCourse)
router.route("/").get(isAuthenticated ,getCreatedCourses)
router.route('/:courseId').put(isAuthenticated, singleUpload,editCourse)
router.route('/:courseId').get(isAuthenticated,singleUpload, getCourseById)

router.route('/:courseId/lecture').post(isAuthenticated, createLec)
router.route('/:courseId/lecture').get(isAuthenticated, getCourseLec)
router.route('/:courseId/lecture/:lectureId').post(isAuthenticated, editLec)
router.route('/lecture/:lectureId').delete(isAuthenticated, removeLec)

router.route('/:courseId').patch(togglePublishedCourse)

export default router
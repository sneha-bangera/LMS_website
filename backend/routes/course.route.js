import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createCourse, getCreatedCourses, getPublishedCourse } from "../controllers/course.controller.js"

const router = express.Router()

router.route("/").post(isAuthenticated, createCourse)
router.route("/published-courses").get(getPublishedCourse)
router.route("/").get(isAuthenticated ,getCreatedCourses)

export default router
import express from 'express'
import { singleUpload } from '../middleware/multer.js'
import getDataUri from '../utils/dataUri.js'
import cloudinary from '../utils/cludinary.js'

const router= express.Router()

router.route('/upload-video').post(singleUpload, async(req , res)=> {
    try {
        const file= req.file
        const fileUri = getDataUri(file)

        const result= await cloudinary.uploader.upload(fileUri, {
            resource_type:"auto"
        })
        res.status(200).json({
            success: true,
            message:"file uplaod successful",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error upload"
        })
    }
})

export default router
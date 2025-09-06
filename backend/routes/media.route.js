import express from 'expree'
import { singleUpload } from '../middleware/multer'
import getDataUri from '../utils/dataUri'
import cloudinary from '../utils/cludinary'

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
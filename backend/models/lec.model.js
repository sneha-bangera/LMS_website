import mongoose from 'mongoose'

const lecSchema= new mongoose.Schema({
    lecTitle: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
    },
    publicId: {
        type: String,
    },
    isPreviewFree: {
        type: Boolean,
    },
},{timestamps:true})

export const Lecture =mongoose.model("Lecture", lecSchema)
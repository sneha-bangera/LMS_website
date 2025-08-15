import mongoose, { connect } from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected successfullt!");
        
    }catch(err){
        console.log("Error occured", err);
    }
}
export default connectDB;